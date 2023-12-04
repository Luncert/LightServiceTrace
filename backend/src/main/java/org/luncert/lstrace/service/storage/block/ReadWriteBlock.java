package org.luncert.lstrace.service.storage.block;

import java.io.IOException;
import org.luncert.lstrace.service.storage.StorageConfig;
import org.luncert.lstrace.service.storage.io.ByteBufferReadOperator;
import org.luncert.lstrace.service.storage.io.ByteBufferWriteOperator;
import org.luncert.lstrace.service.storage.io.ReadOperator;
import org.luncert.lstrace.service.storage.io.WriteOperator;

// TODO: thread-safe
public class ReadWriteBlock<T extends BlockRecord> extends RandomAccessBasedBlock<T> {

  private final WriteOperator writeOperator;
  private final ReadOperator readOperator;

  public ReadWriteBlock(int id) throws IOException {
    super(id, "rw");
    writeOperator = new ByteBufferWriteOperator(buffer);
    readOperator = new ByteBufferReadOperator(buffer);
  }

  public ReadWriteBlock(int id, ReadOnlyBlock<T> readOnlyBlock) {
    super(id, readOnlyBlock.handle);
    writeOperator = new ByteBufferWriteOperator(buffer);
    readOperator = new ByteBufferReadOperator(buffer);
  }

  @Override
  public T append(T record) {
    record.setId(nextRecordId());
    StorageConfig.get().getWriter()
        .write(record, writeOperator);
    return record;
  }

  @Override
  public T get(int id) {
    return StorageConfig.<T>get().getReader().read(readOperator);
  }
}
