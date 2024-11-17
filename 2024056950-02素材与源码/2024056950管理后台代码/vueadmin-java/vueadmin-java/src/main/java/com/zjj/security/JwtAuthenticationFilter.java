package com.zjj.security;

import cn.hutool.core.util.StrUtil;
import com.zjj.entity.User;
import com.zjj.service.UserService;
import com.zjj.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserDetailServiceImpl userDetailService;

    @Autowired
    UserService sysUserService;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        System.out.println("请求地址：" + request.getRequestURL());
        String jwt = request.getHeader(jwtUtil.getHeader());
        if (StrUtil.isBlankOrUndefined(jwt)) {
            chain.doFilter(request, response);
            return;
        }

        Claims claim = jwtUtil.getClaimByToken(jwt);
        if (claim == null) {
            throw new JwtException("token 异常");
        }
        if (jwtUtil.isTokenExpired(claim)) {
            throw new JwtException("token已过期");
        }

        String username = claim.getSubject();
        // 获取用户的权限等信息

        User user = sysUserService.getByUsername(username);
        UsernamePasswordAuthenticationToken token
                = new UsernamePasswordAuthenticationToken(username, null, userDetailService.getUserAuthority(user.getId()));

        SecurityContextHolder.getContext().setAuthentication(token);

        chain.doFilter(request, response);
    }
}
