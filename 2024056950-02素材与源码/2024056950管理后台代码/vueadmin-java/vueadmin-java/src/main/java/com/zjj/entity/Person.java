package com.zjj.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.sql.Blob;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

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
@TableName("person")
@ApiModel(value = "Person对象", description = "")
public class Person{

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @JsonProperty("_openid")
    @TableField("openid")
    private String openid;

    @TableField("nickname")
    private String nickName;

    @TableField("faceImg")
    private String faceImg;

    @TableField("address")
    private String address;
}
