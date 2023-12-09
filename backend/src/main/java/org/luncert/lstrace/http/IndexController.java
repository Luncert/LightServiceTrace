package org.luncert.lstrace.http;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class IndexController {

  @GetMapping("/")
  public RedirectView redirectRootToView() {
    return new RedirectView("/content/index.html");
  }

  @GetMapping("/content")
  public RedirectView redirectContentToView() {
    return new RedirectView("/content/index.html");
  }
}
