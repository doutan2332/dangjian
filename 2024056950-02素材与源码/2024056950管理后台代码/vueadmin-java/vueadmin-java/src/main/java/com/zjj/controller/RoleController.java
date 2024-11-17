package com.zjj.controller;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zjj.common.lang.Const;
import com.zjj.common.lang.Result;
import com.zjj.entity.Role;
import com.zjj.entity.RoleMenu;
import com.zjj.entity.UserRole;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author zjj
 * @since 2022-04-15
 */
@RestController
@RequestMapping("/sys/role")
public class RoleController extends BaseController {

    @PreAuthorize("hasAuthority('sys:role:list')")
    @GetMapping("/info/{id}")
    public Result info(@PathVariable(name = "id") Long id) {
        Role role = roleService.getById(id);
        //获取角色相关联的菜单id
        List<RoleMenu> roleMenus = roleMenuService.list(new QueryWrapper<RoleMenu>().eq("role_id", id));
        List<Long> menuIds = roleMenus.stream().map(p -> p.getMenuId()).collect(Collectors.toList());

        role.setMenuIds(menuIds);

        return Result.success(role);
    }

    @PreAuthorize("hasAuthority('sys:role:list')")
    @GetMapping("/list")
    public Result list(String name) {
        Page<Role> pageData = roleService.page(getPage(), new QueryWrapper<Role>().like(StrUtil.isNotBlank(name), "name", name));
        return Result.success(pageData);
    }

    @PreAuthorize("hasAuthority('sys:role:save')")
    @PostMapping("/save")
    public Result save(@Validated @RequestBody Role role) {
        role.setCreated(LocalDateTime.now());
        role.setStatus(Const.STATUS_ON);

        roleService.save(role);
        return Result.success(role);
    }

    @PreAuthorize("hasAuthority('sys:role:update')")
    @PostMapping("/update")
    public Result update(@Validated @RequestBody Role role) {
        role.setUpdated(LocalDateTime.now());

        roleService.updateById(role);

        //更新缓存
        userService.clearUserAuthorityInfoByRoleId(role.getId());
        return Result.success(role);
    }

    @PreAuthorize("hasAuthority('sys:role:delete')")
    @PostMapping("/delete")
    @Transactional
    public Result delete(@RequestBody Long[] ids) {
        roleService.removeByIds(Arrays.asList(ids));
        //删除中间表
        userRoleService.remove(new QueryWrapper<UserRole>().in("role_id",ids));
        roleMenuService.remove(new QueryWrapper<RoleMenu>().in("role_id",ids));
        //缓存同步删除
        Arrays.stream(ids).forEach(id -> {
            userService.clearUserAuthorityInfoByRoleId(id);
        });
        return Result.success("");
    }
    @PostMapping("/perm/{roleId}")
    @PreAuthorize("hasAuthority('sys:role:perm')")
    @Transactional
    public Result perm(@PathVariable(name = "roleId") Long roleId ,@RequestBody Long[] menuIds) {
        List<RoleMenu> roleMenus = new ArrayList<>();
        Arrays.stream(menuIds).forEach(menuId -> {
            RoleMenu roleMenu = new RoleMenu();
            roleMenu.setMenuId(menuId);
            roleMenu.setRoleId(roleId);

            roleMenus.add(roleMenu);
        });

        //先删除原来的记录，再保存新的
        roleMenuService.remove(new QueryWrapper<RoleMenu>().eq("role_id", roleId));
        roleMenuService.saveBatch(roleMenus);

        //删除缓存
        userService.clearUserAuthorityInfoByRoleId(roleId);

        return Result.success(menuIds);
    }
}
