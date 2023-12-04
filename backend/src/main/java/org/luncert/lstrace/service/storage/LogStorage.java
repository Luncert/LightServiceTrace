package org.luncert.lstrace.service.storage;

import java.io.EOFException;
import java.io.IOException;
import org.luncert.lstrace.service.storage.block.Block;
import org.luncert.lstrace.service.storage.block.BlockPool;

public class LogStorage {

  private final BlockPool blockPool = new BlockPool();
  private Block<LogRecord> currentBlock = blockPool.alloc();

  public void append(LogRecord record) {
    try {
      currentBlock.append(record);
    } catch (EOFException e) {
      // alloc new block and retry
      currentBlock.freeze();
      currentBlock = blockPool.alloc();
      try {
        currentBlock.append(record);
      } catch (IOException ex) {
        throw new RuntimeException(ex);
      }
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
