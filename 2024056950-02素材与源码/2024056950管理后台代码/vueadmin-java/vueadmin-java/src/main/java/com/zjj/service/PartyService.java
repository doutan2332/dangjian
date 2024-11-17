package com.zjj.service;

import com.zjj.entity.Party;
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
public interface PartyService extends IService<Party> {
    List<Party> getPartyListByAddress(String address);

    void saveParty(String openid, String leisure);
}
