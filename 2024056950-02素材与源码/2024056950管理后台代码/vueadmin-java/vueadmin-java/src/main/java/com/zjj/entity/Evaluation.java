package com.zjj.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 *
 * </p>
 *
 * @author zjj
 * @since 2022-05-08
 */
@Getter
@Setter
@TableName("evaluation")
@ApiModel(value = "Evaluation对象", description = "")
public class Evaluation {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("openid")
    private String openid;

    @TableField("communist_id")
    private String communistId;

    @TableField("content")
    private String content;

    @TableField("status")
    private Integer status;

    @TableField(exist = false)
    private String communistNickname;
    @TableField(exist = false)
    private String residentNickname;

}
