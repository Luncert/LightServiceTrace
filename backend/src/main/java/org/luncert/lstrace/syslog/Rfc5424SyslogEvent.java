package org.luncert.lstrace.syslog;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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
  private String structuredData;
  private String message;

  @Override
  public Date getDate() {
    if (NIL.equals(timestamp)) {
      return null;
    }
    String fixTz = timestamp.replace("Z", "+00:00");
    final int tzSeparatorPos = fixTz.lastIndexOf(":");
    fixTz = fixTz.substring(0, tzSeparatorPos) + fixTz.substring(tzSeparatorPos + 1);
    try {
      return new SimpleDateFormat("yyyy-MM-dd'T'hh:mm:ss.SSSZ").parse(fixTz);
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
