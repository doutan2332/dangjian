package com.zjj.service;

import com.zjj.entity.PartyLeisure;
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
public interface PartyLeisureService extends IService<PartyLeisure> {
    List<PartyLeisure> getPartyLeisureListByAddress(String address);
    List<String> getPartyLeisureListByTime(String time);

    List<PartyLeisure> getPartyLeisureAll();
}
