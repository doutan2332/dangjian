package com.zjj.service;

import com.zjj.entity.News;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author zjj
 * @since 2022-04-26
 */
public interface NewsService extends IService<News> {

    List<News> getAnnouncementListByAddress(String address);
}
