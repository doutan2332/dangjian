package com.zjj.mapper;

import com.zjj.entity.News;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author zjj
 * @since 2022-04-26
 */
@Mapper
public interface NewsMapper extends BaseMapper<News> {

    List<News> getAnnouncementListByAddress(String address);
}
