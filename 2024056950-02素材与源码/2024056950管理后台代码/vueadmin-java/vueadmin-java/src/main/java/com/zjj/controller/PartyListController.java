package com.zjj.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zjj.common.dto.PartyDto;
import com.zjj.common.lang.Result;
import com.zjj.entity.PartyLeisure;
import com.zjj.entity.Person;
import com.zjj.service.PartyLeisureService;
import com.zjj.service.PartyService;
import com.zjj.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class PartyListController {
    @Autowired
    PartyService partyService;
    @Autowired
    PartyLeisureService partyLeisureService;
    @Autowired
    PersonService personService;

    @GetMapping("/party/information")
    public Result getPartyInformation() {
        List<PartyDto> partyDtos = new ArrayList<>();
        partyService.list().forEach(party -> {
            PartyDto partyDto = new PartyDto();
            String openid = party.getOpenid();
            Person person = personService.getOne(new QueryWrapper<Person>().eq("openid", openid));
            partyDto.setOpenid(openid);
            partyDto.setStatus(party.getStatus());
            partyDto.setAddress(person.getAddress());
            partyDtos.add(partyDto);
        });
        partyDtos.forEach(partyDto -> {
            PartyLeisure one = partyLeisureService.getOne(new QueryWrapper<PartyLeisure>().eq("openid", partyDto.getOpenid()));
            if(one != null) {
                partyDto.setLeisure(one.getLeisure());
            }
        });
        return Result.success(partyDtos);
    }
}
