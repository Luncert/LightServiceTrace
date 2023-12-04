package org.luncert.lstrace.service.storage.io;

import org.luncert.lstrace.service.storage.block.BlockRecord;

public interface RecordWriter<T extends BlockRecord> {

  void write(T record, WriteOperator operator);
}
