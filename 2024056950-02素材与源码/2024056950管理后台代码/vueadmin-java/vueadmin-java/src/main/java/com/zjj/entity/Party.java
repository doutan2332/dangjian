package com.zjj.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

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
@TableName("party")
@ApiModel(value = "Party对象", description = "")
public class Party{

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("openid")
    @JsonProperty("_openid")
    private String openid;

    @TableField("nickname")
    private String nickName;

    @TableField("real_name")
    private String realName;

    @TableField("telephone")
    private String telephone;

    @TableField("status")
    private Integer status;

    @TableField("picURLS")
    private String picURLS;

}
