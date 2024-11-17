package com.zjj.controller;

import com.zjj.common.lang.Result;
import com.zjj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @Autowired
    UserService userService;
    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/test")
    public Result test(){
        return Result.success(userService.list());
    }
}
