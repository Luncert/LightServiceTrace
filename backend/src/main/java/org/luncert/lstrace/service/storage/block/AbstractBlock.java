package org.luncert.lstrace.service.storage.block;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public abstract class AbstractBlock<T extends BlockRecord> implements Block<T> {

  protected final int id;
  protected long size;

  protected long resolveInternalId(long id) {
    return (id & 0xffff_ffffL);
  }

  protected long nextRecordId() {
    return (((long) id) << 32) | size;
  }
}
