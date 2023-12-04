package org.luncert.lstrace.service.storage.block;

import java.io.IOException;

public interface Block<T extends BlockRecord> {

  int getId();

  T append(T record);

  T get(int id);

  void release() throws IOException;
}
