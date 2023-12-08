package org.luncert.lstrace.service;

import java.io.IOException;
import org.apache.lucene.queryparser.classic.ParseException;
import org.luncert.lstrace.model.GetSyslogResponse;
import org.luncert.lstrace.model.Page;

public interface ILogQueryService {

  Page<GetSyslogResponse> search(String queryString) throws IOException, ParseException;
}
