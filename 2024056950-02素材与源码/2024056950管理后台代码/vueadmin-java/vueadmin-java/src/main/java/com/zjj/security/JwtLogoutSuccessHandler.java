package com.zjj.security;

import cn.hutool.json.JSONUtil;
import com.zjj.common.lang.Result;
import com.zjj.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class JwtLogoutSuccessHandler implements LogoutSuccessHandler {
    @Autowired
    JwtUtil jwtUtil;
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if(authentication != null) {
            new SecurityContextLogoutHandler().logout(request,response,authentication);
        }
        response.setContentType("application/json;charset=UTF-8");
        ServletOutputStream outputStream = response.getOutputStream();
        //因为jwt是无状态的，生成之后无法删除除非它过期失效不然一直可用，
        // 就需要手动清空响应头里面的jwt，虽然清空，但可用
        response.setHeader(jwtUtil.getHeader(),"");

        Result result = Result.success("");

        outputStream.write(JSONUtil.toJsonStr(result).getBytes(StandardCharsets.UTF_8));

        outputStream.flush();
        outputStream.close();
    }
}
