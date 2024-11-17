package com.zjj.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zjj.common.dto.MenuDto;
import com.zjj.entity.Menu;
import com.zjj.entity.User;
import com.zjj.mapper.MenuMapper;
import com.zjj.mapper.UserMapper;
import com.zjj.service.MenuService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.zjj.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
public class MenuServiceImpl extends ServiceImpl<MenuMapper, Menu> implements MenuService {
    @Autowired
            @Lazy
    UserService userService;
    @Autowired
    UserMapper userMapper;

    @Override
    public List<MenuDto> getCurrentUserNav() {
        String username =(String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userService.getByUsername(username);
        List<Long> menuIds = userMapper.getNavMenuIds(user.getId());
        List<Menu> menus = this.listByIds(menuIds);
        //转树状结构
        List<Menu> menuTree = buildTreeMenu(menus);
        //转实体DTO
        return convert(menuTree);
    }

    @Override
    public List<Menu> tree() {
        // 获取所有菜单信息
        List<Menu> menus = this.list(new QueryWrapper<Menu>().orderByAsc("orderNum"));
        //转成树状结构
        return buildTreeMenu(menus);
    }

    private List<MenuDto> convert(List<Menu> menuTree) {
        List<MenuDto> menuDtos = new ArrayList<>();

        menuTree.forEach(m -> {
            MenuDto dto = new MenuDto();
            dto.setId(m.getId());
            dto.setName(m.getPerms());
            dto.setTitle(m.getName());
            dto.setComponent(m.getComponent());
            dto.setPath(m.getPath());
            dto.setIcon(m.getIcon());

            if(m.getChildren().size() > 0) {
                //子节点调用当前方法进修进行再次转换
                dto.setChildren(convert(m.getChildren()));
            }
            menuDtos.add(dto);
        });
        return menuDtos;
    }

    private List<Menu> buildTreeMenu(List<Menu> menus) {
        List<Menu> finalMenus = new ArrayList<>();

        // 先各自寻找到各自的孩子(可以算法优化）
        for (Menu menu : menus) {
            for (Menu e : menus) {
                if (menu.getId() == e.getParentId()) {
                    menu.getChildren().add(e);
                }
            }
            if (menu.getParentId() == 0L) {
                finalMenus.add(menu);
            }
        }
        //提取出父节点

        return finalMenus;
    }
}
