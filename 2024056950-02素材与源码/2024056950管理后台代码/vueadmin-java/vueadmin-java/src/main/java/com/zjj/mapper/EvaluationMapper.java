package com.zjj.mapper;

import com.zjj.entity.Evaluation;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author zjj
 * @since 2022-05-08
 */
@Mapper
public interface EvaluationMapper extends BaseMapper<Evaluation> {

    List<Evaluation> getEvaluationListByAddress(String address);
}
