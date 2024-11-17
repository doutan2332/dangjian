package com.zjj.service.impl;

import com.zjj.entity.PartyLeisure;
import com.zjj.mapper.PartyLeisureMapper;
import com.zjj.service.PartyLeisureService;
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
public class PartyLeisureServiceImpl extends ServiceImpl<PartyLeisureMapper, PartyLeisure> implements PartyLeisureService {
    @Autowired
    PartyLeisureMapper partyLeisureMapper;

    @Override
    public List<PartyLeisure> getPartyLeisureListByAddress(String address) {
        return partyLeisureMapper.getPartyLeisureListByAddress(address);
    }

    @Override
    public List<String> getPartyLeisureListByTime(String time)
    {
        return partyLeisureMapper.getPartyLeisureByTime(time);
    }

    @Override
    public List<PartyLeisure> getPartyLeisureAll()
    {
        return partyLeisureMapper.getPartyLeisureAll();
    }
}
