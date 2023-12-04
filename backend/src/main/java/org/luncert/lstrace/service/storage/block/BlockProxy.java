package org.luncert.lstrace.service.storage.block;

import java.io.IOException;

public class BlockProxy<T extends BlockRecord> extends AbstractBlock<T> {

  private BlockType type;
  private Block<T> target;

  public BlockProxy(BlockType type, int id) {
    super(id);
    this.type = type;
  }

  @Override
  public int getId() {
    if (!supportRead()) {
      switchType(BlockType.ReadWrite);
    }
    return target.getId();
  }

  @Override
  public T append(T record) {
    if (!supportWrite()) {
      switchType(BlockType.ReadWrite);
    }
    return target.append(record);
  }

  @Override
  public T get(int id) {
    return target.get(id);
  }

  @Override
  public void release() throws IOException {
    target.release();
  }

  private boolean supportRead() {
    return type.equals(BlockType.ReadOnly)
        || type.equals(BlockType.ReadWrite);
  }

  private boolean supportWrite() {
    return type.equals(BlockType.WriteOnly)
        || type.equals(BlockType.ReadWrite);
  }

  private void switchType(BlockType type) {
    if (this.type.equals(type)) {
      return;
    }

    switch (type) {
      case ReadOnly -> target = new ReadOnlyBlock<>(id);
      case WriteOnly -> target = new WriteOnlyBlock<>(id);
      case ReadWrite -> {
        if (BlockType.ReadOnly.equals(this.type)) {
          target = new ReadWriteBlock<>(id, ((ReadOnlyBlock<T>) target));
        } else {
          target = new ReadWriteBlock<>(id);
        }
      }
    }

    this.type = type;
  }
}
