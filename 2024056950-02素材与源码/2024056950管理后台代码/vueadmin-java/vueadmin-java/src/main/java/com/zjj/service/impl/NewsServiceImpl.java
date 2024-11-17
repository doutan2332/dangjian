package com.zjj.service.impl;

import com.zjj.entity.News;
import com.zjj.mapper.NewsMapper;
import com.zjj.service.NewsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author zjj
 * @since 2022-04-26
 */
@Service
public class NewsServiceImpl extends ServiceImpl<NewsMapper, News> implements NewsService {
    @Autowired
    NewsMapper newsMapper;

    @Override
    public List<News> getAnnouncementListByAddress(String address) {
        return newsMapper.getAnnouncementListByAddress(address);
    }
}
