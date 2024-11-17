package com.zjj.service;

import com.zjj.common.dto.MenuDto;
import com.zjj.entity.Menu;
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
public interface MenuService extends IService<Menu> {

    List<MenuDto> getCurrentUserNav();

    List<Menu> tree();
}
