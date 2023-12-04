package org.luncert.lstrace.service.storage;

import org.luncert.lstrace.service.storage.block.BlockRecord;

public class StorageConfig {

  private static StorageProperties<?> storageProperties;

  public static void init(StorageProperties<?> properties) {
    synchronized (StorageConfig.class) {
      if (storageProperties != null) {
        throw new IllegalStateException("StorageConfig has been initialized");
      }
      storageProperties = properties;
    }
  }

  @SuppressWarnings("unchecked")
  public static <T extends BlockRecord> StorageProperties<T> get() {
    return (StorageProperties<T>) storageProperties;
  }
}
