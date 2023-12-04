package org.luncert.lstrace.service.storage.block;

import java.io.IOException;

public interface Block<T extends BlockRecord> {

  int getId();

  //long getSize();

  T append(T record) throws IOException;

  T get(int id);

  void freeze();

  void release() throws IOException;
}
