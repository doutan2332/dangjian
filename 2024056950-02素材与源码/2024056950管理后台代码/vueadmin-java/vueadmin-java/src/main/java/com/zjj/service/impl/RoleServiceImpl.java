package com.zjj.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zjj.entity.Role;
import com.zjj.mapper.RoleMapper;
import com.zjj.service.RoleService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author zjj
 * @since 2022-04-15
 */
@Service
public class RoleServiceImpl extends ServiceImpl<RoleMapper, Role> implements RoleService {

    @Override
    public List<Role> listRolesByUserId(Long userId) {
        List<Role> roles = this.list(new QueryWrapper<Role>()
                .inSql("id", "select role_id from sys_user_role where user_id = " + userId));
        return roles;
    }
}
