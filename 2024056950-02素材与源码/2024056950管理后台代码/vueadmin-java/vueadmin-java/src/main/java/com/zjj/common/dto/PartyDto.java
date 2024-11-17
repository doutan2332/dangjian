package com.zjj.common.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PartyDto implements Serializable {
    private String openid;
    private Integer status;
    private String leisure;
    private String address;
}
