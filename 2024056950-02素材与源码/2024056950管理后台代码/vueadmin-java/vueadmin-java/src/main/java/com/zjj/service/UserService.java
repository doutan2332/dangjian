package com.zjj.service;

import com.zjj.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author zjj
 * @since 2022-04-15
 */
public interface UserService extends IService<User> {

    User getByUsername(String username);

    String getUserAuthorityInfo(Long userId);

    void clearUserAuthorityInfo(String username);
    void clearUserAuthorityInfoByRoleId(Long roleId);
    void clearUserAuthorityInfoByMenuId(Long menuId);
}
