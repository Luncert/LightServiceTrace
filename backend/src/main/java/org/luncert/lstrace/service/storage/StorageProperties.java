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

  /**
   * Default 1MB.
   */
  @Builder.Default
  private long blockSize = 1048576;

  /**
   * Default 1GB.
   */
  @Builder.Default
  private long storageSizeLimit = 1073741824L;

  private String dataPath;

  @Builder.Default
  private int blockCacheSize = 128;

  private RecordWriter<T> writer;

  private RecordReader<T> reader;
}
