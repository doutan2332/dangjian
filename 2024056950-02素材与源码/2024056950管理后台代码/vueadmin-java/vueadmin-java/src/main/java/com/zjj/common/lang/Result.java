package com.zjj.common.lang;

import lombok.Data;

import java.io.Serializable;

@Data
public class Result<T> implements Serializable {
    private Integer code;
    private String message;
    private T data;

    /* public static <T> Result success(int code, String message, T data) {
            Result r = new Result();
            r.setData(200);
            r.setMessage(message);
            r.setData(data);
            return r;
        }*/
    public static Result success(int code, String message, Object data) {
        Result r = new Result();
        r.setCode(code);
        r.setMessage(message);
        r.setData(data);
        return r;
    }
    public static Result success(Object data) {
        return success(200,"操作成功",data);
    }

    public static Result fail(int code,String message,Object data) {
        Result r = new Result();
        r.setData(code);
        r.setMessage(message);
        r.setData(data);
        return r;
    }
    public static Result fail(String message) {
        return fail(400,message,null);
    }
}
