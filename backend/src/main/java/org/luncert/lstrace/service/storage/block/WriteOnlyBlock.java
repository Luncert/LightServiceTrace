package org.luncert.lstrace.service.storage.block;

import java.io.BufferedOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import org.luncert.lstrace.service.storage.StorageConfig;
import org.luncert.lstrace.service.storage.io.OutputStreamWriteOperator;
import org.luncert.lstrace.service.storage.io.WriteOperator;

public class WriteOnlyBlock<T extends BlockRecord> extends AbstractBlock<T> {

  private final OutputStream outputStream;
  private final WriteOperator writeOperator;

  public WriteOnlyBlock(int id) {
    super(id);
    try {
      outputStream = new BufferedOutputStream(new FileOutputStream(
          Path.of(StorageConfig.get().getDataPath(), String.valueOf(id)).toString()));
      writeOperator = new OutputStreamWriteOperator(outputStream);
    } catch (FileNotFoundException e) {
      throw new RuntimeException(e);
    }
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
    throw new UnsupportedOperationException();
  }

  @Override
  public void release() throws IOException {
    outputStream.close();
  }
}
