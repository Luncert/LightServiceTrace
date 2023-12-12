//package org.luncert.lstrace.syslog.server;
//
//import com.google.gson.annotations.SerializedName;
//import lombok.Data;
//
//@Data
//public class LogbackJsonMessage {
//
//  @SerializedName("written_ts")
//  private long timestamp;
//
//  @SerializedName("component_name")
//  private String componentName;
//
//  @SerializedName("component_id")
//  private String componentId;
//
//  @SerializedName("organization_name")
//  private String organizationName;
//
//  @SerializedName("organization_id")
//  private String organizationId;
//
//  @SerializedName("space_name")
//  private String spaceName;
//
//  @SerializedName("space_id")
//  private String spaceId;
//
//  @SerializedName("container_id")
//  private String containerId;
//
//  private String type;
//
//  private String logger;
//
//  private String thread;
//
//  private String level;
//
//  private String[] categories;
//
//  private String msg;
//}