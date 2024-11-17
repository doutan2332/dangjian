package com.zjj.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zjj.common.lang.Result;
import com.zjj.entity.Person;
import com.zjj.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author zjj
 * @since 2022-04-26
 */
@RestController
@RequestMapping("/person")
public class PersonController extends BaseController {
    @Autowired
    PersonService personService;
    @PostMapping("/register")
    public Result personRegister(@RequestBody Person person){
        System.out.println("微信注册用户："+person);
        Person one = personService.getOne(new QueryWrapper<Person>().eq("openid", person.getOpenid()));
        if (one == null) {
            personService.save(person);
        }
        return Result.success(person);
    }
}
