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
import javax.validation.constraints.NotNull;

import static io.lettuce.core.pubsub.PubSubOutput.Type.message;

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
@TableName("sys_menu")
@ApiModel(value = "Menu对象", description = "")
public class Menu extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @NotNull(message="上级菜单不能为空")
    @ApiModelProperty("父菜单ID，一级菜单为0")
    @TableField("parent_id")
    private Long parentId;

    @NotBlank(message="菜单名称不能为空")
    @TableField("name")
    private String name;

    @ApiModelProperty("菜单URL")
    @TableField("path")
    private String path;

    @NotBlank(message = "菜单授权码不能为空")
    @ApiModelProperty("授权(多个用逗号分隔，如：user:list,user:create)")
    @TableField("perms")
    private String perms;

    @TableField("component")
    private String component;

    @NotNull(message = "菜单类型不能为空")
    @ApiModelProperty("类型     0：目录   1：菜单   2：按钮")
    @TableField("type")
    private Integer type;

    @ApiModelProperty("菜单图标")
    @TableField("icon")
    private String icon;

    @ApiModelProperty("排序")
    @TableField("orderNum")
    private Integer orderNum;
    @TableField(exist = false)
    private List<Menu> children = new ArrayList<>();
}
