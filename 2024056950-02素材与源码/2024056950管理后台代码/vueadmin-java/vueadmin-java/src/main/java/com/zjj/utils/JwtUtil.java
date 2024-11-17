package com.zjj.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.Date;

@Data
@Component
@ConfigurationProperties(prefix = "zjj.jwt")
public class JwtUtil {
    private long expire;
    private String secret;
    private String header;

    //生成jwt
    public String generateToken(String username) {
        Date nowDate = new Date();
        Date expireDate = new Date(nowDate.getTime() + 1000 * expire);
        return Jwts.builder()
                .setHeaderParam("typ", "JWT")    //设置头部
                .setSubject(username)          //设置主体
                .setIssuedAt(nowDate)          //设置发布时间
                .setExpiration(expireDate)      //7天过期
                .signWith(SignatureAlgorithm.HS512, secret) //使用秘钥，进行HS512加密
                .compact();
    }

    //解析jwt
    public Claims getClaimByToken(String jwt) {
        try {
            return Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(jwt)
                    .getBody();
        }catch (Exception e) {
            return null; //解析出问题（jwt被篡改），就返回null
        }
    }

    //jwt是否过期
    public boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }
}
