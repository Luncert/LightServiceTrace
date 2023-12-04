package org.luncert.lstrace.service.storage.block;

import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Paths;
import org.luncert.lstrace.service.storage.StorageConfig;

public abstract class RandomAccessBasedBlock<T extends BlockRecord> extends AbstractBlock<T> {

  protected RandomAccessFile handle;
  protected final ByteBuffer buffer;

  public RandomAccessBasedBlock(int id, String mode) {
    super(id);
    try {
      handle = new RandomAccessFile(
          Paths.get(StorageConfig.get().getDataPath(), String.valueOf(id)).toString(), mode);
      buffer = handle.getChannel().map(FileChannel.MapMode.READ_WRITE,
          0, StorageConfig.get().getBlockSize());
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  public RandomAccessBasedBlock(int id, RandomAccessFile handle) {
    super(id);
    try {
      buffer = handle.getChannel().map(FileChannel.MapMode.READ_WRITE,
          0, StorageConfig.get().getBlockSize());
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public void release() throws IOException {
    handle.close();
    handle = null;
  }
}
