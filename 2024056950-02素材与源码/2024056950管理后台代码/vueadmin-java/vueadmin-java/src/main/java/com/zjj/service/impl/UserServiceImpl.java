package com.zjj.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zjj.entity.Menu;
import com.zjj.entity.Role;
import com.zjj.entity.User;
import com.zjj.mapper.UserMapper;
import com.zjj.service.MenuService;
import com.zjj.service.RoleService;
import com.zjj.service.UserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zjj.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author zjj
 * @since 2022-04-15
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Autowired
    RoleService roleService;
    @Autowired
    UserMapper userMapper;
    @Autowired
    MenuService menuService;
    @Autowired
    RedisUtil redisUtil;

    @Override
    public User getByUsername(String username) {
        return getOne(new QueryWrapper<User>().eq("username",username));
    }

    @Override
    public String getUserAuthorityInfo(Long userId) {
        User user = userMapper.selectById(userId);
        // ROLE_admin,ROLE_normal,sys:user:list,...
        String authority = "";

        if(redisUtil.hasKey("GranteAuthority:"+user.getUsername())) {
            authority = (String) redisUtil.get("GranteAuthority:"+user.getUsername());
        } else {
            //获取角色
            List<Role> roles = roleService.list(new QueryWrapper<Role>()
                    .inSql("id", "select role_id from sys_user_role where user_id =" + userId));
            if (roles.size() > 0) {
                String roleCodes = roles.stream().map(r -> "ROLE_" + r.getCode()).collect(Collectors.joining(","));
                authority = roleCodes.concat(",");
            }
            //获取菜单操作编码，根据用户id多表查询
            List<Long> menuIds = userMapper.getNavMenuIds(userId);
            if(menuIds.size() > 0) {
                List<Menu> menus = menuService.listByIds(menuIds);
                String menuPerms = menus.stream().map(m -> m.getPerms()).collect(Collectors.joining(","));
                authority = authority.concat(menuPerms);
            }
            redisUtil.set("GranteAuthority:"+user.getUsername(),authority,60 * 60);
        }

        return authority;
    }

    @Override
    public void clearUserAuthorityInfo(String username) {
        redisUtil.del("GranteAuthority:"+username);
    }

    @Override
    public void clearUserAuthorityInfoByRoleId(Long roleId) {
        List<User> users = this.list(new QueryWrapper<User>().inSql("id", "select user_id from sys_user_role where role_id = " + roleId));
        users.forEach(user -> {
            this.clearUserAuthorityInfo(user.getUsername());
        });
    }

    @Override
    public void clearUserAuthorityInfoByMenuId(Long menuId) {
        List<User> users = userMapper.listByMenuId(menuId);
        users.forEach(user -> {
            this.clearUserAuthorityInfo(user.getUsername());
        });
    }
}
