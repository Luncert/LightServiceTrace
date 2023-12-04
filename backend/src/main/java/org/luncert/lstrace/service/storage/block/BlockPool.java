package org.luncert.lstrace.service.storage.block;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.luncert.lstrace.service.storage.StorageConfig;

public class BlockPool {

  private final int maximumBlockCount = (int)
      (StorageConfig.get().getStorageSizeLimit() / StorageConfig.get().getBlockSize());
  private int blockCount = 0;
  private final Map<Integer, LruCache<Block<?>>.Node> blockMap = new ConcurrentHashMap<>();
  private final LruCache<Block<?>> lruCache = new LruCache<>(
      StorageConfig.get().getBlockCacheSize(),
      block -> blockMap.remove(block.getId()));

  @SuppressWarnings("unchecked")
  public <T extends BlockRecord> Block<T> fetch(int id) {
    LruCache<Block<?>>.Node node = blockMap.get(id);
    if (node == null) {
      // lookup block in fs
      try {
        Block<?> block = new BlockProxy<>(BlockType.ReadOnly, id);
        node = lruCache.add(block);
        blockMap.put(id, node);
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    } else {
      node.access();
    }
    return (Block<T>) node.getContent();
  }

  @SuppressWarnings("unchecked")
  public <T extends BlockRecord> Block<T> alloc() {
    try {
      Block<?> block;
      if (blockCount == maximumBlockCount) {
        block = lruCache.removeHead();
        block.release();
        block = new BlockProxy<>(BlockType.WriteOnly, block.getId());
        blockMap.put(block.getId(), lruCache.add(block));
      } else {
        block = new BlockProxy<>(BlockType.WriteOnly, blockCount++);
        blockMap.put(block.getId(), lruCache.add(block));
      }
      return (Block<T>) block;
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}