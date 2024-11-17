package com.zjj.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zjj.common.lang.Result;
import com.zjj.entity.Party;
import com.zjj.entity.PartyLeisure;
import com.zjj.entity.User;
import com.zjj.service.PartyService;
import com.zjj.service.PartyLeisureService;
import com.zjj.utils.RecommendationAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author zjj
 * @since 2022-04-26
 */
@Slf4j
@RestController
@RequestMapping("/partyLeisure")
public class PartyLeisureController extends BaseController {
    @Autowired
    PartyService partyService;
    @Autowired
    PartyLeisureService partyLeisureService;

    @PostMapping("/save")
    public Result saveLeisure(@RequestBody PartyLeisure partyLeisure) {
        PartyLeisure one = partyLeisureService.getOne(new QueryWrapper<PartyLeisure>().eq("openid", partyLeisure.getOpenid()));
//        System.out.println(one.getLeisure());
        if (one != null) {
            one.setLeisure(partyLeisure.getLeisure() + ",");
            one.setActype(partyLeisure.getActype());
            System.out.println(partyLeisure.getActype());
            partyLeisureService.updateById(one);
            return Result.success("更新预约时间成功");
        }
        partyLeisureService.save(partyLeisure);
        return Result.success("添加预约时间成功");
    }

    @GetMapping("/list")
    @PreAuthorize("hasAuthority('sys:party:time')")
    public Result leisureList(Principal principal) {
        String name = principal.getName();
        User user = userService.getByUsername(name);
        List<PartyLeisure> partyLeisureList = partyLeisureService.getPartyLeisureListByAddress(user.getAddress());
        partyLeisureList.forEach(data -> {
            Party party = partyService.getOne(new QueryWrapper<Party>().eq("openid", data.getOpenid()));
            data.setNickName(party.getNickName());
            data.setRealName(party.getRealName());
        });
        return Result.success(partyLeisureList);
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('sys:party:timeupdate')")
    public Result updateTime(@RequestBody PartyLeisure partyLeisure) {
        PartyLeisure one = partyLeisureService.getOne(new QueryWrapper<PartyLeisure>().eq("openid", partyLeisure.getOpenid()));
        one.setLeisure(partyLeisure.getLeisure());
        partyLeisureService.updateById(one);
        return Result.success("更新时间成功");
    }

    /**
     * 定时清除党员昨日可以预约的空闲时间
     */
    @Scheduled(cron = "30 0 0 * * ?")
    public void deleteYesternday() {
        log.info("定时执行了清除数据库中党员无效的预约时间");
        SimpleDateFormat f = new SimpleDateFormat("yyyy/MM/dd");
        Date now = new Date();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(now);
        calendar.add(Calendar.DATE, -2);
        String yesternday = f.format(calendar.getTime());
        List<PartyLeisure> partyLeisureList = partyLeisureService.list();

        partyLeisureList.forEach(partyLeisure -> {
            String t = partyLeisure.getLeisure();
            String[] split = t.split(",");
            List<String> times = Arrays.asList(split);
            times.removeIf(e -> e.startsWith(yesternday));
            String time = String.join(",", times);
            partyLeisure.setLeisure(time);
            partyLeisureService.updateById(partyLeisure);
        });
    }

    @GetMapping("/times/{time}")
    public Result getLeisureByTime(@PathVariable(name = "time") String time) {
        List<String> partys = partyLeisureService.getPartyLeisureListByTime(time);
        return Result.success(partys);
    }

    //推荐算法
    @GetMapping("/recommendation")
    public List<String> getRecommendedOpenIds(@RequestParam("time") String time, @RequestParam("actype") String activityType) {
        // 查询数据库获取所有党员空闲时间
        List<PartyLeisure> allPartyLeisure = partyLeisureService.getPartyLeisureAll();

        // 根据算法计算权重，排序，返回推荐结果的 openid 数组
        List<String> recommendedOpenIds = RecommendationAlgorithm.calculate(allPartyLeisure, time, activityType);

        return recommendedOpenIds;
    }
}
