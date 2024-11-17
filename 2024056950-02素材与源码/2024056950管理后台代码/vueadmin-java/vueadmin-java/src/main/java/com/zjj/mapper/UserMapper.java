package com.zjj.mapper;

import com.zjj.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author zjj
 * @since 2022-04-15
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

    List<Long> getNavMenuIds(Long userId);

    List<User> listByMenuId(Long menuId);
}
