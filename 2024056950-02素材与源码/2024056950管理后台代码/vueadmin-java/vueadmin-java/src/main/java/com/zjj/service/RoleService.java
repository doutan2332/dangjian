package com.zjj.service;

import com.zjj.entity.Role;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author zjj
 * @since 2022-04-15
 */
public interface RoleService extends IService<Role> {

    List<Role> listRolesByUserId(Long userId);
}
