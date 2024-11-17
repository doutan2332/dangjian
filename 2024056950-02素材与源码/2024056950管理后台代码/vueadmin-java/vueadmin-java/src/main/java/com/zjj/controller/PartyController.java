package com.zjj.controller;

import cn.hutool.core.map.MapUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zjj.common.dto.PartyDto;
import com.zjj.common.lang.Result;
import com.zjj.entity.Party;
import com.zjj.entity.Person;
import com.zjj.entity.User;
import com.zjj.service.PartyLeisureService;
import com.zjj.service.PartyService;
import com.zjj.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author zjj
 * @since 2022-04-26
 */
@RestController
@RequestMapping("/party")
public class PartyController extends BaseController {
    @Autowired
    PersonService personService;
    @Autowired
    PartyService partyService;
    @PostMapping("/identify")
    public void identify(@RequestBody Party party) {
        Party one = partyService.getOne(new QueryWrapper<Party>().eq("openid", party.getOpenid()));
        if (one != null) {
            one.setPicURLS(party.getPicURLS());
            one.setStatus(0);
            partyService.updateById(one);
        }else {
            Person person = personService.getOne(new QueryWrapper<Person>().eq("openid",party.getOpenid()));
            party.setNickName(person.getNickName());
            partyService.save(party);
        }
    }

    @GetMapping("/list")
    @PreAuthorize("hasAuthority('sys:party:list')")
    public Result partyList(Principal principal) {
        String name = principal.getName();
        User user = userService.getByUsername(name);
        return Result.success(partyService.getPartyListByAddress(user.getAddress()));
    }

    @GetMapping("/certified/{openid}/{status}")
    @PreAuthorize("hasAuthority('sys:party:update')")
    public Result updateParty(@PathVariable("openid") String openid, @PathVariable("status") Integer status){
        Party party = partyService.getOne(new QueryWrapper<Party>().eq("openid", openid));
        party.setStatus(status);
        partyService.updateById(party);
//        String leisure = "2024/3/18(星期一) 9:30-11:30,2024/3/18(星期一) 11:30-12:30,2024/3/18(星期一) 17:30-18:30,2024/3/18(星期一) 15:30-17:30";
//        partyService.saveParty(party.getOpenid(), leisure);
        return Result.success("审核完成");

    }

    @GetMapping("/one/{community}")
    public Result getPartOne(@PathVariable("community") String realName) {
        System.out.println(realName);
        Party party = partyService.getOne(new QueryWrapper<Party>().eq("real_name", realName));
        if(party != null)
        {
            System.out.println("是否是党员：" + party.getStatus());
        }
        return Result.success(party.getStatus());
    }

    @GetMapping("/delete/{_opeid}")
    public Result deleteParty(@PathVariable("_openid") String openid) {
        boolean flag = partyService.remove(new QueryWrapper<Party>().eq("openid", openid));
        if (flag)
            return Result.success("取消认证党员成功");
        else
            return Result.fail("取消党员认证失败");
    }
}
