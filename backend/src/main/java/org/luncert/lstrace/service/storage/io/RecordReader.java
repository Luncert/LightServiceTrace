package org.luncert.lstrace.service.storage.io;

import org.luncert.lstrace.service.storage.block.BlockRecord;

public interface RecordReader<T extends BlockRecord> {

  T read(ReadOperator operator);
}
