package com.zjj.service.impl;

import com.zjj.entity.Party;
import com.zjj.entity.PartyLeisure;
import com.zjj.mapper.PartyLeisureMapper;
import com.zjj.mapper.PartyMapper;
import com.zjj.service.PartyLeisureService;
import com.zjj.service.PartyService;
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
public class PartyServiceImpl extends ServiceImpl<PartyMapper, Party> implements PartyService {
    @Autowired
    PartyMapper partyMapper;

    @Override
    public List<Party> getPartyListByAddress(String address) {
        return partyMapper.getPartyListByAddress(address);
    }

    @Override
    public void saveParty(String openid, String leisure) {
        partyMapper.saveParty(openid, leisure);
    }


}
