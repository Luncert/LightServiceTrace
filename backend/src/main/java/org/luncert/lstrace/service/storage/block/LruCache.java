package org.luncert.lstrace.service.storage.block;

import java.util.function.Consumer;
import lombok.Getter;

public class LruCache<T> {

  private final int capacity;
  private final Consumer<T> removeCallback;
  private int size;
  private final Node head;
  private Node tail;

  public LruCache(int capacity, Consumer<T> removeCallback) {
    this.capacity = capacity;
    this.removeCallback = removeCallback;
    head = tail = new Node();
  }

  public Node add(T content) {
    Node node = new Node();
    node.content = content;
    tail.next = node;
    node.prev = tail;
    tail = node;

    if (size == capacity) {
      Node toBeRemoved = head.next;
      head.next = toBeRemoved.next;
      toBeRemoved.next.prev = head;

      toBeRemoved.prev = null;
      toBeRemoved.next = null;
    } else {
      size++;
    }

    return node;
  }

  public T removeHead() {
    Node toBeRemoved = head.next;
    head.next = toBeRemoved.next;
    toBeRemoved.next.prev = head;
    toBeRemoved.next = null;
    toBeRemoved.prev = null;
    return toBeRemoved.content;
  }

  public class Node {

    private Node prev;
    private Node next;

    @Getter
    private T content;

    public void access() {
      prev.next = next;
      next.prev = prev;

      tail.next = this;
      this.prev = tail;
      this.next = null;
      tail = this;
    }
  }
}
