package com.zjj.service;

import com.zjj.entity.Evaluation;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author zjj
 * @since 2022-05-08
 */
public interface EvaluationService extends IService<Evaluation> {

    List<Evaluation> getEvaluationListByAddress(String address);
}
