package com.zjj.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

/**
 * <p>
 * 
 * </p>
 *
 * @author zjj
 * @since 2022-04-26
 */
@Getter
@Setter
@TableName("party_leisure")
@ApiModel(value = "PartyLeisure对象", description = "")
public class PartyLeisure implements Serializable {

    private static final long serialVersionUID = 1L;
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("openid")
    @JsonProperty("_openid")
    private String openid;

    @TableField(exist = false)
    private String nickName;

    @TableField(exist = false)
    private String realName;

    @TableField("leisure")
    private String leisure;

    @TableField("actype")
    private String actype;
}
