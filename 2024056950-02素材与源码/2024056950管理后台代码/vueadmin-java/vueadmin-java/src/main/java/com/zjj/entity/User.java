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

import javax.validation.constraints.Email;
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
@TableName("sys_user")
@ApiModel(value = "User对象", description = "")
public class User extends BaseEntity {

    private static final long serialVersionUID = 1L;

    @NotBlank(message = "用户名不能为空")
    @TableField("username")
    private String username;

    @TableField("password")
    private String password;

    @TableField("avatar")
    private String avatar;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    @TableField("email")
    private String email;

    @TableField("address")
    private String address;

    @TableField("last_login")
    private LocalDateTime lastLogin;

    @TableField(exist = false)
    private List<Role> roles = new ArrayList<>();
}
