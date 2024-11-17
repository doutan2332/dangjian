package com.zjj.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
public class BaseEntity implements Serializable {
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("created")
    private LocalDateTime created;

    @TableField("updated")
    private LocalDateTime updated;

    @TableField("status")
    private Integer status;
}
