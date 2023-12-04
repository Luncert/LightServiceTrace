package org.luncert.lstrace.service.storage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.luncert.lstrace.service.storage.block.BlockRecord;
import org.luncert.lstrace.service.storage.io.RecordReader;
import org.luncert.lstrace.service.storage.io.RecordWriter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StorageProperties<T extends BlockRecord> {

  private long blockSize;

  private long storageSizeLimit;

  private String dataPath;

  private RecordWriter<T> writer;

  private RecordReader<T> reader;
}
