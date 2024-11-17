package com.zjj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class VueadminJavaApplication {

    public static void main(String[] args) {
        SpringApplication.run(VueadminJavaApplication.class, args);
    }

}
