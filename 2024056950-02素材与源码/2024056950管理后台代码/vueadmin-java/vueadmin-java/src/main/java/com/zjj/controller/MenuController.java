package com.zjj.controller;

import cn.hutool.core.map.MapUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zjj.common.dto.MenuDto;
import com.zjj.common.lang.Result;
import com.zjj.entity.Menu;
import com.zjj.entity.RoleMenu;
import com.zjj.entity.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author zjj
 * @since 2022-04-15
 */
@RestController
@RequestMapping("/sys/menu")
public class MenuController extends BaseController {
    /**
     * 获取当前用户的菜单和权限信息
     * @param principal
     * @return
     */
    @GetMapping("/nav")
    public Result nav(Principal principal) {
        User user = userService.getByUsername(principal.getName());

        //获取权限信息
        String authorityInfo = userService.getUserAuthorityInfo(user.getId());
        String[] authorityInfoArray = StringUtils.tokenizeToStringArray(authorityInfo, ",");

        //获取导航栏信息
        List<MenuDto> navs = menuService.getCurrentUserNav();

        return Result.success(MapUtil.builder()
                .put("authorities",authorityInfoArray)
                .put("nav",navs)
                .map()
        );
    }

    @GetMapping("/info/{id}")
    @PreAuthorize("hasAuthority('sys:menu:list')")
    public Result info(@PathVariable(name = "id") Long id) {
        return Result.success(menuService.getById(id));
    }

    @GetMapping("/list")
    @PreAuthorize("hasAuthority('sys:menu:list')")
    public Result list() {
        List<Menu> menus = menuService.tree();
        return Result.success(menus);
    }

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('sys:menu:save')")
    public Result save(@Validated @RequestBody Menu menu) {
        menu.setCreated(LocalDateTime.now());
        menuService.save(menu);
        return Result.success(menu);
    }

    @PostMapping("/update")
    @PreAuthorize("hasAuthority('sys:menu:update')")
    public Result update(@Validated @RequestBody Menu menu) {
        menu.setUpdated(LocalDateTime.now());
        menuService.updateById(menu);
        //清除所有与该菜单相关的权限缓存
        userService.clearUserAuthorityInfoByMenuId(menu.getId());
        return Result.success(menu);
    }

    @PostMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('sys:menu:delete')")
    public Result delete(@PathVariable(name = "id") Long id) {
        long count = menuService.count(new QueryWrapper<Menu>().eq("parent_id", id));
        if (count > 0) {
            return Result.fail("请先删除子菜单");
        }
        //清除所有与该菜单相关的权限缓存
        userService.clearUserAuthorityInfoByMenuId(id);
        menuService.removeById(id);
        //同步删除中间关联表
        roleMenuService.remove(new QueryWrapper<RoleMenu>().eq("menu_id",id));
        return Result.success("删除成功");
    }
}
