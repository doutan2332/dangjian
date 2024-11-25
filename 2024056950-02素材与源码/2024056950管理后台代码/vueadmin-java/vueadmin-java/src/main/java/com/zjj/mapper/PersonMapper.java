package com.zjj.mapper;

import com.zjj.entity.Person;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author zjj
 * @since 2022-04-26
 */
@Mapper
public interface PersonMapper extends BaseMapper<Person> {

}
