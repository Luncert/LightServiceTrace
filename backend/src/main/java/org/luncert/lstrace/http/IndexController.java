package org.luncert.lstrace.http;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

  @GetMapping("/")
  public String redirectRootToView() {
    return "index";
  }

  @GetMapping("/content")
  public String redirectContentToView() {
    return "index";
  }
}
