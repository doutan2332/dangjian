package com.zjj.service.impl;

import com.zjj.entity.Evaluation;
import com.zjj.mapper.EvaluationMapper;
import com.zjj.service.EvaluationService;
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
 * @since 2022-05-08
 */
@Service
public class EvaluationServiceImpl extends ServiceImpl<EvaluationMapper, Evaluation> implements EvaluationService {

    @Autowired
    EvaluationMapper evaluationMapper;

    @Override
    public List<Evaluation> getEvaluationListByAddress(String address) {
        return evaluationMapper.getEvaluationListByAddress(address);
    }
}
