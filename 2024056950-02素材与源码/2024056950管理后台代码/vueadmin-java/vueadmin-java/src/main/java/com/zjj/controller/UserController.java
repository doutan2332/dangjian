package com.zjj.controller;

import cn.hutool.core.lang.Assert;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.zjj.common.dto.PassDto;
import com.zjj.common.lang.Const;
import com.zjj.common.lang.Result;
import com.zjj.entity.Role;
import com.zjj.entity.User;
import com.zjj.entity.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
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
@RequestMapping("/sys/user")
public class UserController extends BaseController {

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/info/{id}")
    @PreAuthorize("hasAuthority('sys:user:list')")
    public Result info(@PathVariable(name = "id") Long id) {
        User user = userService.getById(id);
        Assert.notNull(user,"找不到该管理员");

        List<Role> roles = roleService.listRolesByUserId(id);

        user.setRoles(roles);

        return Result.success(user);
    }

    @GetMapping("/list")
    @PreAuthorize("hasAuthority('sys:user:list')")
    public Result list(String username) {
        Page<User> pageData = userService.page(getPage(), new QueryWrapper<User>()
                .like(StrUtil.isNotBlank(username), "username", username));
        pageData.getRecords().forEach(u -> {
            u.setRoles(roleService.listRolesByUserId(u.getId()));
        });
        return Result.success(pageData);
    }

    @PostMapping("/save")
    @PreAuthorize("hasAuthority('sys:user:save')")
    public Result save(@Validated @RequestBody User user) {
        user.setCreated(LocalDateTime.now());
        user.setStatus(Const.STATUS_ON);
        //默认密码
        String password = passwordEncoder.encode(Const.DEFAULT_PASSWORD);
        user.setPassword(password);
        //默认头像
        user.setAvatar(Const.DEFAULT_AVATAR);

        userService.save(user);

        return Result.success(user);
    }
    @PostMapping("/update")
    @PreAuthorize("hasAuthority('sys:user:update')")
    public Result update(@Validated @RequestBody User user) {
        user.setUpdated(LocalDateTime.now());
        userService.updateById(user);
        return Result.success(user);
    }
    @PostMapping("/delete")
    @PreAuthorize("hasAuthority('sys:user:delete')")
    @Transactional
    public Result delete(@RequestBody Long[] ids) {
        userService.removeByIds(Arrays.asList(ids));
        userRoleService.remove(new QueryWrapper<UserRole>().in("user_id",ids));
        return Result.success("删除成功");
    }
    @Transactional
    @PostMapping("/role/{userId}")
    @PreAuthorize("hasAuthority('sys:user:role')")
    public Result rolePerm(@PathVariable(name = "userId") Long userId, @RequestBody Long[] roleIds) {
        List<UserRole> userRoles = new ArrayList<>();

        Arrays.stream(roleIds).forEach(r -> {
            UserRole userRole = new UserRole();
            userRole.setRoleId(r);
            userRole.setUserId(userId);

            userRoles.add(userRole);
        });

        userRoleService.remove(new QueryWrapper<UserRole>().eq("user_id",userId));
        userRoleService.saveBatch(userRoles);
        //删除缓存
        User user = userService.getById(userId);
        userService.clearUserAuthorityInfo(user.getUsername());

        return Result.success("");
    }
    @PostMapping("/repass")
    @PreAuthorize("hasAuthority('sys:user:repass')")
    public Result repass(@RequestBody Long userId) {
        User user = userService.getById(userId);
        user.setPassword(passwordEncoder.encode(Const.DEFAULT_PASSWORD));
        user.setUpdated(LocalDateTime.now());
        userService.updateById(user);
        return Result.success("");
    }
    @PostMapping("/updatePass")
    public Result updatePass(@Validated @RequestBody PassDto passDto, Principal principal) {
        User user = userService.getByUsername(principal.getName());
        boolean matches = passwordEncoder.matches(passDto.getCurrentPass(), user.getPassword());
        if(!matches) {
            return Result.fail("旧密码不正确");
        }
        user.setPassword(passwordEncoder.encode(passDto.getPassword()));
        user.setUpdated(LocalDateTime.now());
        userService.updateById(user);
        return Result.success("");
    }
}
