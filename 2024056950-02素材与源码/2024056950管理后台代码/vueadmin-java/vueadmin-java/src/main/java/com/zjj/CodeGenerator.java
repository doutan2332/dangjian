package com.zjj;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.config.rules.NamingStrategy;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
import com.baomidou.mybatisplus.generator.fill.Column;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class CodeGenerator {
    public static void main(String[] args) {
        String projectPath = System.getProperty("user.dir");
        FastAutoGenerator.create("jdbc:mysql://localhost:3306/vue2admin?useUnicode=true&useSSL=false&characterEncoding=utf8&serverTimezone=Asia/Shanghai",
                        "root",
                        "123456")
                // 全局配置
                .globalConfig(builder -> {
                    builder.author("zjj") // 设置作者
                            .enableSwagger() // 开启 swagger 模式
                            .fileOverride() // 覆盖已生成文件
                            .outputDir(projectPath + "/src/main/java"); // 指定输出目录
                })
                // 包配置
                .packageConfig(builder -> {
                    builder.parent("com.zjj") // 设置父包名
//                            .moduleName("system") // 设置父包模块名
                            .entity("entity")   //pojo 实体类包名
                            .service("service") //Service 包名
                            .serviceImpl("service.impl") // ***ServiceImpl 包名
                            .mapper("mapper")   //Mapper 包名
                            .xml("mapper")  //Mapper XML 包名
                            .controller("controller") //Controller 包名
//                            .other("utils") //自定义文件包名
                            .pathInfo(Collections.singletonMap(OutputFile.mapper.xml, System.getProperty("user.dir") + "/src/main/resources/mapper"));   //配置 **Mapper.xml 路径信息：项目的 resources 目录的 Mapper 目录下
                })
                // 策略配置
                .strategyConfig((scanner, builder) ->
                        builder.addInclude(getTables(scanner.apply("请输入表名，多个英文逗号分隔？所有输入 all")))
                                .addTablePrefix("sys_") // 设置过滤表前缀

                                //4.1、Mapper策略配置
                                .mapperBuilder()
                                .superClass(BaseMapper.class)   //设置父类
                                .formatMapperFileName("%sMapper")   //格式化 mapper 文件名称
                                .enableMapperAnnotation()       //开启 @Mapper 注解
                                .formatXmlFileName("%sMapper")  //格式化 Xml 文件名称

                                //4.2、service 策略配置
                                .serviceBuilder()
                                .formatServiceFileName("%sService") //格式化 service 接口文件名称，%s进行匹配表名，如 UserService
                                .formatServiceImplFileName("%sServiceImpl") //格式化 service 实现类文件名称，%s进行匹配表名，如 UserServiceImpl

                                //4.3、实体类策略配置
                                .entityBuilder()
                                .superClass("BaseEntity")   //实体继承的父类
                                .addSuperEntityColumns("id","created","updated","status")  //父类中的公共属性
                                .enableLombok() //开启 Lombok
//                                .disableSerialVersionUID()  //不实现 Serializable 接口，不生产 SerialVersionUID
                                .logicDeleteColumnName("deleted")   //逻辑删除字段名
                                .naming(NamingStrategy.underline_to_camel)  //数据库表映射到实体的命名策略：下划线转驼峰命
                                .columnNaming(NamingStrategy.underline_to_camel)    //数据库表字段映射到实体的命名策略：下划线转驼峰命
                                .addTableFills(
                                        new Column("create_time", FieldFill.INSERT),
                                        new Column("modify_time", FieldFill.INSERT_UPDATE)
                                )   //添加表字段填充，"create_time"字段自动填充为插入时间，"modify_time"字段自动填充为插入修改时间
                                .enableTableFieldAnnotation()       // 开启生成实体时生成字段注解

                                //4.4、Controller策略配置
                                .controllerBuilder()
                                .superClass("BaseController")
                                .formatFileName("%sController") //格式化 Controller 类文件名称，%s进行匹配表名，如 UserController
                                .enableRestStyle()  //开启生成 @RestController 控制器
                                .build()
                )
                /*
                    模板引擎配置，默认 Velocity 可选模板引擎 Beetl 或 Freemarker
                   .templateEngine(new BeetlTemplateEngine())
                   .templateEngine(new FreemarkerTemplateEngine())
                 */
                .templateEngine(new FreemarkerTemplateEngine())
                .execute();

    }

    // 处理 all 情况
    protected static List<String> getTables(String tables) {
        return "all".equals(tables) ? Collections.emptyList() : Arrays.asList(tables.split(","));
    }
}
