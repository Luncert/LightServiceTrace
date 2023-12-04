package org.luncert.lstrace.service.storage.block;

import org.luncert.lstrace.service.storage.StorageConfig;
import org.luncert.lstrace.service.storage.io.ByteBufferReadOperator;
import org.luncert.lstrace.service.storage.io.ReadOperator;

public class ReadOnlyBlock<T extends BlockRecord> extends RandomAccessBasedBlock<T> {

  private final ReadOperator readOperator;

  public ReadOnlyBlock(int id) {
    super(id, "r");
    readOperator = new ByteBufferReadOperator(buffer);
  }

  @Override
  public T append(T content) {
    throw new UnsupportedOperationException();
  }

  @Override
  public T get(int id) {
    return StorageConfig.<T>get().getReader().read(readOperator);
  }
}
