package com.zjj.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

/**
 * <p>
 * 
 * </p>
 *
 * @author zjj
 * @since 2022-04-15
 */
@Getter
@Setter
@TableName("sys_role")
@ApiModel(value = "Role对象", description = "")
public class Role extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @NotBlank(message = "角色名称不能为空")
    @TableField("name")
    private String name;

    @NotBlank(message = "角色编码不能为空")
    @TableField("code")
    private String code;

    @ApiModelProperty("备注")
    @TableField("remark")
    private String remark;

    @TableField(exist = false)
    private List<Long> menuIds = new ArrayList<>();
}
