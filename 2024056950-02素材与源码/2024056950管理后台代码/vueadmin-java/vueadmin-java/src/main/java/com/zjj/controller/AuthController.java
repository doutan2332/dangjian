package com.zjj.controller;

import cn.hutool.core.lang.UUID;
import cn.hutool.core.map.MapUtil;
import com.google.code.kaptcha.Producer;
import com.zjj.common.lang.Const;
import com.zjj.common.lang.Result;
import com.zjj.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import sun.misc.BASE64Encoder;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.security.Principal;

@RestController
public class AuthController extends BaseController{
    @Autowired
    Producer producer;
    @GetMapping("/captcha")
    public Result captcha() throws IOException {
        String key = UUID.randomUUID().toString();
        String code = producer.createText();    //生成5位的验证码

        BufferedImage image = producer.createImage(code); //生成验证码图片
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(image,"jpg",outputStream); //把图片写入流中

        BASE64Encoder encoder = new BASE64Encoder();
        String str = "data:image/jpeg;base64,";
        String base64Img = str + encoder.encode(outputStream.toByteArray()); //对图片进行base64位编码

        redisUtil.hset(Const.CAPTCHA_KEY,key,code,120);

        return Result.success(
                MapUtil.builder()
                        .put("key",key)
                        .put("base64Img",base64Img)
                        .build()
        );
    }

    /**
     * 获取用户信息接口
     * @param principal
     * @return
     */
    @GetMapping("/sys/userInfo")
    public Result userInfo(Principal principal) {
        User user = userService.getByUsername(principal.getName());
        return Result.success(MapUtil.builder()
                        .put("id",user.getId())
                        .put("username",user.getUsername())
                        .put("avatar",user.getAvatar())
                        .put("created",user.getCreated())
                        .map()
                );
    }
}
