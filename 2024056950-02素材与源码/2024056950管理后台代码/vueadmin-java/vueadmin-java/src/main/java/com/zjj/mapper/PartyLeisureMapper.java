package com.zjj.mapper;

import com.zjj.entity.PartyLeisure;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Service;

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
public interface PartyLeisureMapper extends BaseMapper<PartyLeisure> {
    List<PartyLeisure> getPartyLeisureListByAddress(String address);

    List<String> getPartyLeisureByTime(String time);

    @Select("select openid, leisure, actype from party_leisure")
    List<PartyLeisure> getPartyLeisureAll();
}
