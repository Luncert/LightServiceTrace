package org.luncert.lstrace.service;

import java.io.IOException;
import java.util.List;
import org.apache.lucene.queryparser.classic.ParseException;
import org.luncert.lstrace.model.GetSyslogResponse;

public interface ILogQueryService {

  List<GetSyslogResponse> search(String queryString) throws IOException, ParseException;
}
