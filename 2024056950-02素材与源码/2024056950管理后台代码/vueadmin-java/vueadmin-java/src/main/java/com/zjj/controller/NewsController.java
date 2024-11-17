package com.zjj.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zjj.common.lang.Result;
import com.zjj.entity.News;
import com.zjj.entity.User;
import com.zjj.service.NewsService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author zjj
 * @since 2022-04-26
 */
@RestController
@RequestMapping("/news")
public class NewsController extends BaseController {
    @Autowired
    NewsService newsService;
    @GetMapping("/list")
    @PreAuthorize("hasAuthority('sys:news:list')")
    public Result getNewsList(Principal principal){
        String name = principal.getName();
        User user = userService.getByUsername(name);
        Page<News> pageData = newsService.page(getPage());
        List<News> records = pageData.getRecords();
        List<News> newRecords = new ArrayList<>();
        records.forEach(r-> {
            if (StringUtils.isBlank(r.getAddress())|| user.getAddress().equals(r.getAddress())) {
                newRecords.add(r);
            }
        });
        pageData.setRecords(newRecords);
        return Result.success(pageData);
    }
    @PostMapping("/save")
    @PreAuthorize("hasAuthority('sys:news:save')")
    public Result addNews(@RequestBody News news, Principal principal){
        if (news.getId() == null) {
            if (news.getType().equals("公告")) {
                String name = principal.getName();
                User user = userService.getByUsername(name);
                news.setAddress(user.getAddress());
            }
            newsService.save(news);
        } else {
            newsService.updateById(news);
        }
        return Result.success("操作成功");
    }
    @GetMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('sys:news:delete')")
    public Result deleteNewsById(@PathVariable("id") Long id) {
        newsService.removeById(id);
        return Result.success("删除成功");
    }

    @GetMapping("/all")
    public Result getNews() {
        return Result.success(newsService.list());
    }

    @GetMapping("/announcement/{address}")
    public Result getAnnouncementList(@PathVariable(name = "address") String address) {
        List<News> announcements = newsService.getAnnouncementListByAddress(address);
        return Result.success(announcements);
    }
}
