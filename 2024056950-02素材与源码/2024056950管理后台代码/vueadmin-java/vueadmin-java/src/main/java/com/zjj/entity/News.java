package com.zjj.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.sql.Blob;
import java.time.LocalDateTime;
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
@TableName("news")
@ApiModel(value = "News对象", description = "")
public class News {

    private static final long serialVersionUID = 1L;

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("type")
    private String type;

    @TableField("title")
    private String title;

    @TableField("content")
    private String content;

    @TableField("date")
    private LocalDateTime date;

    @TableField("address")
    private String address;

}
