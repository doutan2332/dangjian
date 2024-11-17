package com.zjj.service.impl;

import com.zjj.entity.Person;
import com.zjj.mapper.PersonMapper;
import com.zjj.service.PersonService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author zjj
 * @since 2022-04-26
 */
@Service
public class PersonServiceImpl extends ServiceImpl<PersonMapper, Person> implements PersonService {

}
