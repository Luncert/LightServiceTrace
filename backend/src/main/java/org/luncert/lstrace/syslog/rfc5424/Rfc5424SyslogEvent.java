package org.luncert.lstrace.syslog.rfc5424;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.productivity.java.syslog4j.server.SyslogServerEventIF;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rfc5424SyslogEvent implements SyslogServerEventIF {

  private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  private static final String NIL = "-";

  private byte[] raw;

  private String prioVersion;
  private int facility;
  private int level;
  private int version;

  private String timestamp;
  private String host;
  private String appName;
  private String procId;
  private String msgId;
  //private String structuredData;
  private String message;

  private String thread;
  private String logger;
  private Map<String, String> attrs;

  @Override
  public Date getDate() {
    if (NIL.equals(timestamp)) {
      return null;
    }
    try {
      return sdf.parse(timestamp);
    } catch (ParseException e) {
      throw new Rfc5424SyslogException(e);
    }
  }

  public void setDate(Date date) {
  }

  @Override
  public String getCharSet() {
    return "UTF-8";
  }

  @Override
  public void setCharSet(String s) {
  }
}
