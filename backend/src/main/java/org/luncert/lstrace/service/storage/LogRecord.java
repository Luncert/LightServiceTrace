package org.luncert.lstrace.service.storage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.luncert.lstrace.service.storage.block.BlockRecord;
import org.luncert.lstrace.service.storage.indexing.Searchable;

@Data
@EqualsAndHashCode(callSuper = true)
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LogRecord extends BlockRecord {

  @Searchable
  private int facility;
  @Searchable
  private int level;
  private int version;

  @Searchable
  private long timestamp;
  @Searchable
  private String host;
  @Searchable
  private String appName;
  @Searchable
  private String procId;
  @Searchable
  private String msgId;
  @Searchable
  private String structuredData;
  @Searchable
  private String message;
}
