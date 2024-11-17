package com.zjj.config;

import com.zjj.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity //Spring Security用于启用Web安全的注解
/*开启基于方法的安全认证机制，也就是说在web层的controller启用注解机制的安全确认，
只有加了@EnableGlobalMethodSecurity(prePostEnabled=true)
那么在controller方法上面使用的 @PreAuthorize(“hasAuthority(‘admin’)”)才会生效
 */
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    //域名白名单
    private static final String[] URL_WHITELIST = {
            "/login",
            "/logout",
            "/captcha",
            "/person/register",
            "/party/identify",
            "/partyLeisure/save",
            "/party/information",
            "/party/one/*",
            "/party/delete/*",
            "/news/all",
            "/news/announcement/*",
            "/favicon.ico",
            "/evaluation/add",
            "/evaluation/getEvaluations",
            "/partyLeisure/recommendation"
    };
    @Autowired
    LoginSuccessHandler loginSuccessHandler;
    @Autowired
    LoginFailureHandler loginFailureHandler;
    @Autowired
    JwtLogoutSuccessHandler logoutSuccessHandler;
    @Autowired
    CaptchaFilter captchaFilter;
    @Autowired
    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    @Autowired
    JwtAccessDeniedHandler jwtAccessDeniedHandler;
    @Autowired
    UserDetailServiceImpl userDetailService;

    @Bean
    JwtAuthenticationFilter jwtAuthorizationFilter() throws Exception {
        JwtAuthenticationFilter jwtAuthorizationFilter = new JwtAuthenticationFilter(authenticationManager());
        return jwtAuthorizationFilter;
    }

    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                //登录配置
                .formLogin()
                .successHandler(loginSuccessHandler)
                .failureHandler(loginFailureHandler)
                //退出配置
                .and()
                .logout()
                .logoutSuccessHandler(logoutSuccessHandler)
                //禁用session
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                //配置拦截规则
                .and()
                .authorizeRequests()
                .antMatchers(URL_WHITELIST).permitAll()
                .anyRequest().authenticated()
                //异常处理器
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
                //配置自定义的过滤器
                .and()
                .addFilter(jwtAuthorizationFilter())
                //把校验验证码的过滤器放在校验用户名密码过滤器之前
                .addFilterBefore(captchaFilter, UsernamePasswordAuthenticationFilter.class)
        ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailService);
    }
}
