package com.zjj.mapper;

import com.zjj.entity.Party;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Insert;
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
public interface PartyMapper extends BaseMapper<Party>{
    List<Party> getPartyListByAddress(String address);


    void saveParty(String openid, String leisure);
}
