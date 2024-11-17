/*
 Navicat Premium Data Transfer

 Source Server         : 本机Mysql_
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : vue2admin

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 27/04/2024 23:09:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for evaluation
-- ----------------------------
DROP TABLE IF EXISTS `evaluation`;
CREATE TABLE `evaluation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `communist_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `communist_id` (`communist_id`) USING BTREE,
  KEY `openid2` (`openid`) USING BTREE,
  CONSTRAINT `communist_id` FOREIGN KEY (`communist_id`) REFERENCES `party` (`openid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `openid2` FOREIGN KEY (`openid`) REFERENCES `person` (`openid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of evaluation
-- ----------------------------
BEGIN;
INSERT INTO `evaluation` VALUES (1, 'oZKqy5YPWUA27u4IvWJwDWB0ruFQ', 'oZKqy5ceXJyjhP95YALicLU5hqhQ', '该党员很有责任心', 1);
INSERT INTO `evaluation` VALUES (2, 'oXqgB7bte-9XmoLQAP6l0GggHreE', 'oXqgB7XCOD-oUCP7H3VriHq9o684', '谢谢帮我照顾孩子，十分感谢', NULL);
COMMIT;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `date` date DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of news
-- ----------------------------
BEGIN;
INSERT INTO `news` VALUES (6, '党内新闻', '全面贯彻中共二十大精神', '党坚持稳中求进工作总基调，果断实行新冠疫情防控转段，坚决克服内外困难，顽强拼搏、勇毅前行，推动经济恢复发展，圆满实现经济社会发展主要预期目标。经济总量预计超过126万亿元，粮食总产再创新高，就业、物价总体稳定，科技创新实现新突破，新质生产力加快形成，新一轮党和国家机构改革基本完成，高水平对外开放持续扩大，抗洪灾、化债险、保交楼成效明显，居民收入增长快于经济增长。港澳工作继续加强，反“独”促统坚决有力。中国特色大国外交扎实推进，我国发展的外部环境继续改善。全面从严治党和反腐败斗争持续发力，良好政治生态不断巩固发展。成功举办成都大运会、杭州亚运会，我国体育健儿创造良好成绩。这些成绩来之不易、可圈可点。我们在化危机、闯难关、应变局中创造了新机遇、赢得了战略主动，极大地增强了信心和底气。', '2024-01-31', NULL);
INSERT INTO `news` VALUES (7, '动态民生', '三胎生育政策来了！如何守护头胎孩子的身心健康？', '近年来，我国人口老龄化加重，为了进一步优化生育政策，2021年开始实施一对夫妻可以生育三个子女的政策。很多年轻人可能正在准备生育二胎和三胎，无论是生二胎还是三胎的父母，您知道面对家庭结构的变化，我们要如何守护头胎孩子的身心健康吗？\n\n自2016年全面开放二胎政策以来，很多学者做了关于生育二胎的家庭一胎的心理健康、二胎家庭父母教养方式等方面的研究。调查研究表明，二孩出生前，头胎处于“独生子女”的成长环境中，大多数都受父母宠爱。当家中迎来一个更小的生命后，父母在不经意间就会将自己的精力放在较小的、需要更多照顾的孩子身上，此时，头胎儿童就会觉得父母不爱自己了，丧失对家庭、对父母的安全感。生育二胎或多胎的家庭当中，老大会出现嫉妒和自卑的心理，出现不爱与人交流、不爱学习、行为退化、甚至出现过激行为等。当然，并不是所有的生养二胎、多胎的家庭一胎都会出现问题，这和很多的因素有关，家庭教育与家庭氛围对头胎排斥其他的同胞有着至关重要的影响。\n\n为了避免这些问题的出现，在教养子女方面我们应该如何去做呢？\n\n1.避免差别对待\n\n差别对待的定义为：父母在情感、投入或者管教等方面更多地指向某个孩子, 而更少地指向另一个孩子的方式。由于孩子的个性特征、气质类型的不同，父母可能会无意识的将情感、管教等倾向于另一个孩子，这无疑会造成不良的影响。差别对待呈现出不同的领域特性，包括情感、纪律规范、同胞特权、家务分配以及与父母一起活动时间等方面差别。做到完全无差别是不太可能的，但是作为父母我们可能要有意识的调节自己的行为和情感，做到相对的公平。\n\n2.采用良好的沟通\n\n无论是生育二胎还是三胎，需要与一胎和二胎进行积极的沟通，使其对家庭结构的变化有心理的预期，对孩子的内心真实想法有了解，进行积极的引导。更多的关注孩子们的变化，以民主的方式沟通交流，当发现孩子可能存在不同以往的情况时，需要及时沟通，避免孩子形成严重的心理问题。如果一个家庭有良好的教育方式与沟通方式，儿童在良好的教育下懂得分享和包容，就不易出现排斥二胎的问题，且在出现情绪困扰时懂得或愿意与父母沟通，那么这就易于同胞矛盾的解决。\n\n3.以恰当的方式处理同胞之间的冲突\n\n当子女们发生冲突的时候，采用更合理的方式化解矛盾。面对同胞冲突，父母解决冲突的方式有三种，第一种方式是父母不卷入同胞的冲突中，让孩子们自己解决问题。研究表明，父母使用这种冲突解决方式，同胞之间的亲密性似乎相对较高，但前提是原本孩子之间的情感较好；第二种是父母介入冲突，通常情况下这种方式往往加剧同胞冲突的发生，不利于同胞关系的改善。但是这是一种常见的类型。第三种是父母指导孩子解决冲突，这种方式对于儿童期正在学习新的社会技能的同胞来说比较适用，对处于青少年期的同胞来说，可能是无效的方式。因此，我们要根据孩子不同的个性特征及不同的年龄阶段等采用更适当的方式。\n\n4.建立良好的亲子关系\n\n研究表明，安全的亲子关系有助于儿童积极地应对因为自己的同胞出生所带来的压力。头胎子女能够从父母那里得到足够的爱，他们的爱并没有因为弟弟或妹妹的到来而有所减少，那么头胎子女对同胞的接纳程度自然会更高。\n\n无论是生育二胎还是三胎，我们的初衷都是美好的，希望自己的孩子不孤单，有人陪伴。那么，要想不违背我们的初衷，需要我们做的还有很多。守护孩子的身心健康，是我们为人父母不能推卸的责任！ ', '2023-12-20', NULL);
INSERT INTO `news` VALUES (8, '党内新闻', '集体学习时强调 加快发展新质生产力 扎实推进高质量发展', '新华社北京2月1日电 中共中央政治局1月31日下午就扎实推进高质量发展进行第十一次集体学习。中共中央总书记习近平在主持学习时强调，必须牢记高质量发展是新时代的硬道理，全面贯彻新发展理念，把加快建设现代化经济体系、推进高水平科技自立自强、加快构建新发展格局、统筹推进深层次改革和高水平开放、统筹高质量发展和高水平安全等战略任务落实到位，完善推动高质量发展的考核评价体系，为推动高质量发展打牢基础。发展新质生产力是推动高质量发展的内在要求和重要着力点，必须继续做好创新这篇大文章，推动新质生产力加快发展。\n\n这次中央政治局集体学习，由中央政治局同志自学并交流工作体会，马兴瑞、何立峰、张国清、袁家军同志结合分管领域和地方的工作作了发言，刘国中、陈敏尔同志提交了书面发言，大家进行了交流。\n\n习近平在主持学习时发表了重要讲话。他指出，新时代以来，党中央作出一系列重大决策部署，推动高质量发展成为全党全社会的共识和自觉行动，成为经济社会发展的主旋律。近年来，我国科技创新成果丰硕，创新驱动发展成效日益显现；城乡区域发展协调性、平衡性明显增强；改革开放全面深化，发展动力活力竞相迸发；绿色低碳转型成效显著，发展方式转变步伐加快，高质量发展取得明显成效。同时，制约高质量发展因素还大量存在，要高度重视，切实解决。\n\n习近平强调，高质量发展需要新的生产力理论来指导，而新质生产力已经在实践中形成并展示出对高质量发展的强劲推动力、支撑力，需要我们从理论上进行总结、概括，用以指导新的发展实践。概括地说，新质生产力是创新起主导作用，摆脱传统经济增长方式、生产力发展路径，具有高科技、高效能、高质量特征，符合新发展理念的先进生产力质态。它由技术革命性突破、生产要素创新性配置、产业深度转型升级而催生，以劳动者、劳动资料、劳动对象及其优化组合的跃升为基本内涵，以全要素生产率大幅提升为核心标志，特点是创新，关键在质优，本质是先进生产力。\n\n习近平指出，科技创新能够催生新产业、新模式、新动能，是发展新质生产力的核心要素。必须加强科技创新特别是原创性、颠覆性科技创新，加快实现高水平科技自立自强，打好关键核心技术攻坚战，使原创性、颠覆性科技创新成果竞相涌现，培育发展新质生产力的新动能。\n\n习近平强调，要及时将科技创新成果应用到具体产业和产业链上，改造提升传统产业，培育壮大新兴产业，布局建设未来产业，完善现代化产业体系。要围绕发展新质生产力布局产业链，提升产业链供应链韧性和安全水平，保证产业体系自主可控、安全可靠。要围绕推进新型工业化和加快建设制造强国、质量强国、网络强国、数字中国和农业强国等战略任务，科学布局科技创新、产业创新。要大力发展数字经济，促进数字经济和实体经济深度融合，打造具有国际竞争力的数字产业集群。\n\n习近平指出，绿色发展是高质量发展的底色，新质生产力本身就是绿色生产力。必须加快发展方式绿色转型，助力碳达峰碳中和。牢固树立和践行绿水青山就是金山银山的理念，坚定不移走生态优先、绿色发展之路。加快绿色科技创新和先进绿色技术推广应用，做强绿色制造业，发展绿色服务业，壮大绿色能源产业，发展绿色低碳产业和供应链，构建绿色低碳循环经济体系。持续优化支持绿色低碳发展的经济政策工具箱，发挥绿色金融的牵引作用，打造高效生态绿色产业集群。同时，在全社会大力倡导绿色健康生活方式。\n\n习近平强调，生产关系必须与生产力发展要求相适应。发展新质生产力，必须进一步全面深化改革，形成与之相适应的新型生产关系。要深化经济体制、科技体制等改革，着力打通束缚新质生产力发展的堵点卡点，建立高标准市场体系，创新生产要素配置方式，让各类先进优质生产要素向发展新质生产力顺畅流动。同时，要扩大高水平对外开放，为发展新质生产力营造良好国际环境。\n\n习近平强调，要按照发展新质生产力要求，畅通教育、科技、人才的良性循环，完善人才培养、引进、使用、合理流动的工作机制。要根据科技发展新趋势，优化高等学校学科设置、人才培养模式，为发展新质生产力、推动高质量发展培养急需人才。要健全要素参与收入分配机制，激发劳动、知识、技术、管理、资本和数据等生产要素活力，更好体现知识、技术、人才的市场价值，营造鼓励创新、宽容失败的良好氛围。\n\n新华社北京2月1日电 中共中央政治局1月31日下午就扎实推进高质量发展进行第十一次集体学习。中共中央总书记习近平在主持学习时强调，必须牢记高质量发展是新时代的硬道理，全面贯彻新发展理念，把加快建设现代化经济体系、推进高水平科技自立自强、加快构建新发展格局、统筹推进深层次改革和高水平开放、统筹高质量发展和高水平安全等战略任务落实到位，完善推动高质量发展的考核评价体系，为推动高质量发展打牢基础。发展新质生产力是推动高质量发展的内在要求和重要着力点，必须继续做好创新这篇大文章，推动新质生产力加快发展。\n\n这次中央政治局集体学习，由中央政治局同志自学并交流工作体会，马兴瑞、何立峰、张国清、袁家军同志结合分管领域和地方的工作作了发言，刘国中、陈敏尔同志提交了书面发言，大家进行了交流。\n\n习近平在主持学习时发表了重要讲话。他指出，新时代以来，党中央作出一系列重大决策部署，推动高质量发展成为全党全社会的共识和自觉行动，成为经济社会发展的主旋律。近年来，我国科技创新成果丰硕，创新驱动发展成效日益显现；城乡区域发展协调性、平衡性明显增强；改革开放全面深化，发展动力活力竞相迸发；绿色低碳转型成效显著，发展方式转变步伐加快，高质量发展取得明显成效。同时，制约高质量发展因素还大量存在，要高度重视，切实解决。\n\n习近平强调，高质量发展需要新的生产力理论来指导，而新质生产力已经在实践中形成并展示出对高质量发展的强劲推动力、支撑力，需要我们从理论上进行总结、概括，用以指导新的发展实践。概括地说，新质生产力是创新起主导作用，摆脱传统经济增长方式、生产力发展路径，具有高科技、高效能、高质量特征，符合新发展理念的先进生产力质态。它由技术革命性突破、生产要素创新性配置、产业深度转型升级而催生，以劳动者、劳动资料、劳动对象及其优化组合的跃升为基本内涵，以全要素生产率大幅提升为核心标志，特点是创新，关键在质优，本质是先进生产力。\n\n习近平指出，科技创新能够催生新产业、新模式、新动能，是发展新质生产力的核心要素。必须加强科技创新特别是原创性、颠覆性科技创新，加快实现高水平科技自立自强，打好关键核心技术攻坚战，使原创性、颠覆性科技创新成果竞相涌现，培育发展新质生产力的新动能。\n\n习近平强调，要及时将科技创新成果应用到具体产业和产业链上，改造提升传统产业，培育壮大新兴产业，布局建设未来产业，完善现代化产业体系。要围绕发展新质生产力布局产业链，提升产业链供应链韧性和安全水平，保证产业体系自主可控、安全可靠。要围绕推进新型工业化和加快建设制造强国、质量强国、网络强国、数字中国和农业强国等战略任务，科学布局科技创新、产业创新。要大力发展数字经济，促进数字经济和实体经济深度融合，打造具有国际竞争力的数字产业集群。\n\n习近平指出，绿色发展是高质量发展的底色，新质生产力本身就是绿色生产力。必须加快发展方式绿色转型，助力碳达峰碳中和。牢固树立和践行绿水青山就是金山银山的理念，坚定不移走生态优先、绿色发展之路。加快绿色科技创新和先进绿色技术推广应用，做强绿色制造业，发展绿色服务业，壮大绿色能源产业，发展绿色低碳产业和供应链，构建绿色低碳循环经济体系。持续优化支持绿色低碳发展的经济政策工具箱，发挥绿色金融的牵引作用，打造高效生态绿色产业集群。同时，在全社会大力倡导绿色健康生活方式。\n\n习近平强调，生产关系必须与生产力发展要求相适应。发展新质生产力，必须进一步全面深化改革，形成与之相适应的新型生产关系。要深化经济体制、科技体制等改革，着力打通束缚新质生产力发展的堵点卡点，建立高标准市场体系，创新生产要素配置方式，让各类先进优质生产要素向发展新质生产力顺畅流动。同时，要扩大高水平对外开放，为发展新质生产力营造良好国际环境。\n\n习近平强调，要按照发展新质生产力要求，畅通教育、科技、人才的良性循环，完善人才培养、引进、使用、合理流动的工作机制。要根据科技发展新趋势，优化高等学校学科设置、人才培养模式，为发展新质生产力、推动高质量发展培养急需人才。要健全要素参与收入分配机制，激发劳动、知识、技术、管理、资本和数据等生产要素活力，更好体现知识、技术、人才的市场价值，营造鼓励创新、宽容失败的良好氛围。', '2024-04-13', NULL);
INSERT INTO `news` VALUES (9, '公告', '关于开展常态化核酸检测工作的通告', '为进一步加强疫情风险排查，及时发现潜在风险，努力确保全市社会安全和市民健康安全，市新冠肺炎疫情防控总指挥部研究决定，从5月5日开始，对全市范围内市民每周一次开展常态化核酸检测工作，现将有关事项通告如下：\n\n一、针对“五一”假期人员流动大、风险较高的情况，5月5日开始的首次常态化核酸检测，采取集中采样检测的方式进行，全市范围内所有市民（含常住人口、暂住人口和流动人口）应检尽检，集中采样时间为5月5日6时-22时。\n\n之后从5月12日开始，采取一周之内就近采样检测方式进行，具体组织工作近期将专门发布通告。\n\n二、本次核酸采样检测，由各区市县（先导区）统一组织，广大市民按照所在街道（乡镇）、社区（村）安排，错时前往采样点，按工作人员指引有序完成采样工作，采样全程佩戴口罩，与他人保持1米以上间隔，不交谈、不聚集。\n\n三、为确保社会公共安全，对自己及他人健康安全负责，广大市民要“应检尽检”。各行业主管部门、各单位要督促本行业、本单位人员定期开展核酸检测。对不按规定进行检测的人员，市民通行码将赋“灰码”。“灰码”人员将限制进入市防指第22号令规定的相关公共场所。各行业部门、各相关单位日常要严格做好市民通行码查验。\n\n四、考虑进入相关公共场所要求市民出示相应期限内的核酸检测报告，在采样后、检测出结果前，为市民先提供纸质核酸采样证明，作为出入公共场所的凭证，请广大市民在采样结束后现场及时领取。为防范潜在疫情风险，建议广大市民朋友在检测出结果前，尽可能不去相关公共场所。\n\n常态化核酸检测是早期发现病例的重要手段，是疫情常态化防控的重要手段，请广大市民主动参与定期核酸检测，积极配合市民通行码查验，共同筑牢疫情防控屏障，守护我们城市家园来之不易的防控成果！', '2024-02-24', '重庆市重庆市辖区沙坪坝区虎溪街道花马社区居民委员会');
INSERT INTO `news` VALUES (10, '公告', '收水费通知', '通 知 本单元各位住户：\n\n由于我单元未按时交清水费，现已停水三天，为杜绝停水情况出现，从本月起，每月本单元住户给替大家收缴水费的人辛苦费5元，请大家按时交纳。\n\n各位住户互相转告 特此通知', '2024-01-31', '重庆市重庆市辖区沙坪坝区虎溪街道花马社区居民委员会');
INSERT INTO `news` VALUES (11, '党内新闻', '全面总结2023年经济工作，部署2024年经济工作', '习近平在重要讲话中全面总结2023年经济工作，深刻分析当前经济形势，系统部署2024年经济工作。李强作总结讲话，对贯彻落实习近平总书记重要讲话精神、做好明年经济工作提出要求。\n\n会议认为，今年是全面贯彻党的二十大精神的开局之年，是三年新冠疫情防控转段后经济恢复发展的一年。以习近平同志为核心的党中央团结带领全党全国各族人民，顶住外部压力、克服内部困难，全面深化改革开放，加大宏观调控力度，着力扩大内需、优化结构、提振信心、防范化解风险，我国经济回升向好，高质量发展扎实推进。现代化产业体系建设取得重要进展，科技创新实现新的突破，改革开放向纵深推进，安全发展基础巩固夯实，民生保障有力有效，全面建设社会主义现代化国家迈出坚实步伐。\n\n会议指出，进一步推动经济回升向好需要克服一些困难和挑战，主要是有效需求不足、部分行业产能过剩、社会预期偏弱、风险隐患仍然较多，国内大循环存在堵点，外部环境的复杂性、严峻性、不确定性上升。要增强忧患意识，有效应对和解决这些问题。综合起来看，我国发展面临的有利条件强于不利因素，经济回升向好、长期向好的基本趋势没有改变，要增强信心和底气。\n\n会议认为，近年来，在党中央坚强领导下，我们有效统筹国内国际两个大局、统筹疫情防控和经济社会发展、统筹发展和安全，深化了新时代做好经济工作的规律性认识。必须把坚持高质量发展作为新时代的硬道理，完整、准确、全面贯彻新发展理念，推动经济实现质的有效提升和量的合理增长。必须坚持深化供给侧结构性改革和着力扩大有效需求协同发力，发挥超大规模市场和强大生产能力的优势，使国内大循环建立在内需主动力的基础上，提升国际循环质量和水平。必须坚持依靠改革开放增强发展内生动力，统筹推进深层次改革和高水平开放，不断解放和发展社会生产力、激发和增强社会活力。必须坚持高质量发展和高水平安全良性互动，以高质量发展促进高水平安全，以高水平安全保障高质量发展，发展和安全要动态平衡、相得益彰。必须把推进中国式现代化作为最大的政治，在党的统一领导下，团结最广大人民，聚焦经济建设这一中心工作和高质量发展这一首要任务，把中国式现代化宏伟蓝图一步步变成美好现实。\n\n会议强调，做好明年经济工作，要以习近平新时代中国特色社会主义思想为指导，全面贯彻落实党的二十大和二十届二中全会精神，坚持稳中求进工作总基调，完整、准确、全面贯彻新发展理念，加快构建新发展格局，着力推动高质量发展，全面深化改革开放，推动高水平科技自立自强，加大宏观调控力度，统筹扩大内需和深化供给侧结构性改革，统筹新型城镇化和乡村全面振兴，统筹高质量发展和高水平安全，切实增强经济活力、防范化解风险、改善社会预期，巩固和增强经济回升向好态势，持续推动经济实现质的有效提升和量的合理增长，增进民生福祉，保持社会稳定，以中国式现代化全面推进强国建设、民族复兴伟业。\n\n会议要求，明年要坚持稳中求进、以进促稳、先立后破，多出有利于稳预期、稳增长、稳就业的政策，在转方式、调结构、提质量、增效益上积极进取，不断巩固稳中向好的基础。要强化宏观政策逆周期和跨周期调节，继续实施积极的财政政策和稳健的货币政策，加强政策工具创新和协调配合。\n\n积极的财政政策要适度加力、提质增效。要用好财政政策空间，提高资金效益和政策效果。优化财政支出结构，强化国家重大战略任务财力保障。合理扩大地方政府专项债券用作资本金范围。落实好结构性减税降费政策，重点支持科技创新和制造业发展。严格转移支付资金监管，严肃财经纪律。增强财政可持续性，兜牢基层“三保”底线。严控一般性支出。党政机关要习惯过紧日子。\n\n稳健的货币政策要灵活适度、精准有效。保持流动性合理充裕，社会融资规模、货币供应量同经济增长和价格水平预期目标相匹配。发挥好货币政策工具总量和结构双重功能，盘活存量、提升效能，引导金融机构加大对科技创新、绿色转型、普惠小微、数字经济等方面的支持力度。促进社会综合融资成本稳中有降。保持人民币汇率在合理均衡水平上的基本稳定。\n\n要增强宏观政策取向一致性。加强财政、货币、就业、产业、区域、科技、环保等政策协调配合，把非经济性政策纳入宏观政策取向一致性评估，强化政策统筹，确保同向发力、形成合力。加强经济宣传和舆论引导，唱响中国经济光明论。\n\n会议强调，明年要围绕推动高质量发展，突出重点，把握关键，扎实做好经济工作。\n\n一是以科技创新引领现代化产业体系建设。要以科技创新推动产业创新，特别是以颠覆性技术和前沿技术催生新产业、新模式、新动能，发展新质生产力。完善新型举国体制，实施制造业重点产业链高质量发展行动，加强质量支撑和标准引领，提升产业链供应链韧性和安全水平。要大力推进新型工业化，发展数字经济，加快推动人工智能发展。打造生物制造、商业航天、低空经济等若干战略性新兴产业，开辟量子、生命科学等未来产业新赛道，广泛应用数智技术、绿色技术，加快传统产业转型升级。加强应用基础研究和前沿研究，强化企业科技创新主体地位。鼓励发展创业投资、股权投资。\n\n二是着力扩大国内需求。要激发有潜能的消费，扩大有效益的投资，形成消费和投资相互促进的良性循环。推动消费从疫后恢复转向持续扩大，培育壮大新型消费，大力发展数字消费、绿色消费、健康消费，积极培育智能家居、文娱旅游、体育赛事、国货“潮品”等新的消费增长点。稳定和扩大传统消费，提振新能源汽车、电子产品等大宗消费。增加城乡居民收入，扩大中等收入群体规模，优化消费环境。要以提高技术、能耗、排放等标准为牵引，推动大规模设备更新和消费品以旧换新。发挥好政府投资的带动放大效应，重点支持关键核心技术攻关、新型基础设施、节能减排降碳，培育发展新动能。完善投融资机制，实施政府和社会资本合作新机制，支持社会资本参与新型基础设施等领域建设。\n\n三是深化重点领域改革。要谋划进一步全面深化改革重大举措，为推动高质量发展、加快中国式现代化建设持续注入强大动力。不断完善落实“两个毫不动摇”的体制机制，充分激发各类经营主体的内生动力和创新活力。深入实施国有企业改革深化提升行动，增强核心功能、提高核心竞争力。促进民营企业发展壮大，在市场准入、要素获取、公平执法、权益保护等方面落实一批举措。促进中小企业专精特新发展。加快全国统一大市场建设，着力破除各种形式的地方保护和市场分割。有效降低全社会物流成本。要谋划新一轮财税体制改革，落实金融体制改革。\n\n四是扩大高水平对外开放。要加快培育外贸新动能，巩固外贸外资基本盘，拓展中间品贸易、服务贸易、数字贸易、跨境电商出口。放宽电信、医疗等服务业市场准入，对标国际高标准经贸规则，认真解决数据跨境流动、平等参与政府采购等问题，持续建设市场化、法治化、国际化一流营商环境，打造“投资中国”品牌。切实打通外籍人员来华经商、学习、旅游的堵点。抓好支持高质量共建“一带一路”八项行动的落实落地，统筹推进重大标志性工程和“小而美”民生项目。\n\n五是持续有效防范化解重点领域风险。要统筹化解房地产、地方债务、中小金融机构等风险，严厉打击非法金融活动，坚决守住不发生系统性风险的底线。积极稳妥化解房地产风险，一视同仁满足不同所有制房地产企业的合理融资需求，促进房地产市场平稳健康发展。加快推进保障性住房建设、“平急两用”公共基础设施建设、城中村改造等“三大工程”。完善相关基础性制度，加快构建房地产发展新模式。统筹好地方债务风险化解和稳定发展，经济大省要真正挑起大梁，为稳定全国经济作出更大贡献。\n\n六是坚持不懈抓好“三农”工作。要锚定建设农业强国目标，学习运用“千万工程”经验，有力有效推进乡村全面振兴，以确保国家粮食安全、确保不发生规模性返贫为底线，以提升乡村产业发展水平、提升乡村建设水平、提升乡村治理水平为重点，强化科技和改革双轮驱动，强化农民增收举措，集中力量抓好办成一批群众可感可及的实事，建设宜居宜业和美乡村。毫不放松抓好粮食等重要农产品稳定安全供给，探索建立粮食产销区省际横向利益补偿机制，改革完善耕地占补平衡制度，提高高标准农田建设投入标准。树立大农业观、大食物观，把农业建成现代化大产业。\n\n七是推动城乡融合、区域协调发展。要把推进新型城镇化和乡村全面振兴有机结合起来，促进各类要素双向流动，推动以县城为重要载体的新型城镇化建设，形成城乡融合发展新格局。实施城市更新行动，打造宜居、韧性、智慧城市。充分发挥各地区比较优势，按照主体功能定位，积极融入和服务构建新发展格局。优化重大生产力布局，加强国家战略腹地建设。大力发展海洋经济，建设海洋强国。\n\n八是深入推进生态文明建设和绿色低碳发展。建设美丽中国先行区，打造绿色低碳发展高地。积极稳妥推进碳达峰碳中和，加快打造绿色低碳供应链。持续深入打好蓝天、碧水、净土保卫战。完善生态产品价值实现机制。落实集体林权制度改革。加快建设新型能源体系，加强资源节约集约循环高效利用，提高能源资源安全保障能力。\n\n九是切实保障和改善民生。要坚持尽力而为、量力而行，兜住、兜准、兜牢民生底线。更加突出就业优先导向，确保重点群体就业稳定。织密扎牢社会保障网，健全分层分类的社会救助体系。加快完善生育支持政策体系，发展银发经济，推动人口高质量发展。\n\n会议指出，要深刻领会党中央对经济形势的科学判断，切实增强做好经济工作的责任感使命感，抓住一切有利时机，利用一切有利条件，看准了就抓紧干，能多干就多干一些，努力以自身工作的确定性应对形势变化的不确定性。要全面贯彻明年经济工作的总体要求，注意把握和处理好速度与质量、宏观数据与微观感受、发展经济与改善民生、发展与安全的关系，不断巩固和增强经济回升向好态势。要准确把握明年经济工作的政策取向，在政策实施上强化协同联动、放大组合效应，在政策储备上打好提前量、留出冗余度，在政策效果评价上注重有效性、增强获得感，着力提升宏观政策支持高质量发展的效果。要讲求工作推进的方式方法，抓住主要矛盾，突破瓶颈制约，注重前瞻布局，确保明年经济工作重点任务落地落实。要始终保持奋发有为的精神状态，胸怀“国之大者”，主动担当作为，加强协同配合，积极谋划用好牵引性、撬动性强的工作抓手，扎实推动高质量发展。\n\n会议强调，要坚持和加强党的全面领导，深入贯彻落实党中央关于经济工作的决策部署。要不折不扣抓落实，确保最终效果符合党中央决策意图。要雷厉风行抓落实，统筹把握时度效。要求真务实抓落实，坚决纠治形式主义、官僚主义。要敢作善为抓落实，坚持正确用人导向，充分发挥各级领导干部的积极性主动性创造性。要巩固拓展主题教育成果，并转化为推动高质量发展的成效。\n\n会议要求，要做好岁末年初重要民生商品保供稳价，保障农民工工资按时足额发放，关心困难群众生产生活，深入落实安全生产责任制，守护好人民群众生命财产安全和身体健康。\n\n会议号召，全党要紧密团结在以习近平同志为核心的党中央周围，坚定信心、开拓奋进，努力实现经济社会发展各项目标任务，以高质量发展的实际行动和成效，为以中国式现代化全面推进强国建设、民族复兴伟业作出新的更大贡献。\n\n中共中央政治局委员、中央书记处书记，全国人大常委会有关领导同志，国务委员，最高人民法院院长，最高人民检察院检察长，全国政协有关领导同志以及中央军委委员等出席会议。', '2023-12-12', NULL);
INSERT INTO `news` VALUES (12, '公告', '关于开展“公共就业服务进校园”活动的通知', '人力资源和社会保障局，两江新区社会保障局，西部科学城重庆高新区政务服务和社会事务中心，万盛经开区人力资源和社会保障局，各高校：    为深入贯彻党中央、国务院关于高校毕业生就业工作的决策部署，进一步提升毕业生就业服务质量，促进其顺利就业、满意就业，引导毕业生留在重庆、就在重庆，根据人力资源社会保障部《关于做好2024年高校毕业生等青年就业创业工作的通知》要求，市人力社保局、市教委拟在全市高校开展“公共就业服务进校园”活动，', '2024-04-11', '重庆市重庆市辖区沙坪坝区沙坪坝街道劳动路居委会');
COMMIT;

-- ----------------------------
-- Table structure for party
-- ----------------------------
DROP TABLE IF EXISTS `party`;
CREATE TABLE `party` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nickname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `real_name` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `telephone` varchar(11) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `picURLS` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `status` int DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `nickname` (`nickname`) USING BTREE,
  KEY `openid` (`openid`) USING BTREE,
  CONSTRAINT `openid` FOREIGN KEY (`openid`) REFERENCES `person` (`openid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of party
-- ----------------------------
BEGIN;
INSERT INTO `party` VALUES (1, 'oZKqy5ceXJyjhP95YALicLU5hqhQ', '你好我叫王甜甜', '宋雨轩', '18652061872', 'https://thirdwx.qlogo.cn/mmopen/vi_32/4ic4eibNibuImXdSbSsV3gniazOhfGfS927wv2CZpdHoohdTMupLYicDddpkdXdBdzyKOvnFNGabzVvXXBLCbfAOLAQ/132', 1);
INSERT INTO `party` VALUES (3, 'oZKqy5YPWUA27u4IvWJwDWB0ruFQ', '安生', '张新蕾', '15736257391', 'https://656e-env-2gu9zqake66213f6-1311105955.tcb.qcloud.la/1652012568348.jpg,https://656e-env-2gu9zqake66213f6-1311105955.tcb.qcloud.la/1652012570884.jpg,https://656e-env-2gu9zqake66213f6-1311105955.tcb.qcloud.la/1652012571818.jpg', 1);
INSERT INTO `party` VALUES (7, 'oXqgB7XCOD-oUCP7H3VriHq9o684', '普洱茶', '武琳鑫', '13734120345', 'https://706f-poole-9g1bnizsadfbeb2f-1325065806.tcb.qcloud.la/1713325731974.jpg', 1);
INSERT INTO `party` VALUES (9, 'oXqgB7bte-9XmoLQAP6l0GggHreE', '拖拖拖拖拖延症', '周秀霖', '13732021358', 'https://706f-poole-9g1bnizsadfbeb2f-1325065806.tcb.qcloud.la/1713980057272.png', 1);
COMMIT;

-- ----------------------------
-- Table structure for party_leisure
-- ----------------------------
DROP TABLE IF EXISTS `party_leisure`;
CREATE TABLE `party_leisure` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `leisure` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `actype` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `uid` (`openid`) USING BTREE,
  CONSTRAINT `uid` FOREIGN KEY (`openid`) REFERENCES `person` (`openid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of party_leisure
-- ----------------------------
BEGIN;
INSERT INTO `party_leisure` VALUES (1, 'oZKqy5YPWUA27u4IvWJwDWB0ruFQ', '2024/4/28(星期日) 15:30-17:30,2024/4/28(星期日) 17:30-18:30,', '老人');
INSERT INTO `party_leisure` VALUES (2, 'oZKqy5ceXJyjhP95YALicLU5hqhQ', '2024/4/28(星期日) 15:30-17:30,2024/4/29(星期一) 9:30-11:30,2024/4/29(星期一) 11:30-12:30,', '小孩');
INSERT INTO `party_leisure` VALUES (9, 'oXqgB7XCOD-oUCP7H3VriHq9o684', '2024/4/28(星期日) 15:30-17:30,2024/4/28(星期日) 17:30-18:30,2024/4/28(星期日) 19:30-21:30,2024/4/29(星期一) 15:30-17:30,2024/4/29(星期一) 11:30-12:30,2024/4/29(星期一) 17:30-18:30,', '全能');
COMMIT;

-- ----------------------------
-- Table structure for person
-- ----------------------------
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `nickname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `faceImg` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `username` (`nickname`) USING BTREE,
  KEY `openid` (`openid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of person
-- ----------------------------
BEGIN;
INSERT INTO `person` VALUES (6, 'oZKqy5YPWUA27u4IvWJwDWB0ruFQ', '安生', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLtMazTxOrKwuK6icn8MyIM0dHhocn4kfHPAT8ROc6u8Yk93pL707yYADb3x280TuIT7eocopdhTxQ/132', '重庆市重庆市辖区沙坪坝区虎溪街道花马社区居民委员会');
INSERT INTO `person` VALUES (9, 'oZKqy5ceXJyjhP95YALicLU5hqhQ', '你好我叫王甜甜', 'https://thirdwx.qlogo.cn/mmopen/vi_32/4ic4eibNibuImXdSbSsV3gniazOhfGfS927wv2CZpdHoohdTMupLYicDddpkdXdBdzyKOvnFNGabzVvXXBLCbfAOLAQ/132', '重庆市重庆市辖区沙坪坝区虎溪街道花马社区居民委员会');
INSERT INTO `person` VALUES (10, 'oXqgB7XCOD-oUCP7H3VriHq9o684', '普洱茶', 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKMAU5moLAol78Uvvf9zepgibPdMHsq0RiaOpp3OfMoB13GkxBzQXNl2kQtsgpwzBbGQN9R6hejnTicJVV0mkH21XObW85icc0sVZ8yiaPiaNCjmZCw/132', '重庆市重庆市辖区沙坪坝区虎溪街道虎溪花园社区居委会');
INSERT INTO `person` VALUES (11, 'o48Cs62LRxuCTJTeUgHN8f_yFqBk', '拖拖拖拖拖延症', 'https://thirdwx.qlogo.cn/mmopen/vi_32/MHPb22FND3hyG7yia5OBk68NcR78TVj41F9NVOaZIxhiasibo7RCOpgG917BCpU6wBfA4mzKCkQQsR2xk6wm2bVfGldKe7XveFBItl2IiaIH3SE/132', '重庆市重庆市辖区沙坪坝区沙坪坝街道劳动路居委会');
INSERT INTO `person` VALUES (12, 'oXqgB7bte-9XmoLQAP6l0GggHreE', '拖拖拖拖拖延症', 'https://thirdwx.qlogo.cn/mmopen/vi_32/nCVSCzUlaqJVxrR0A0nKy3ZF3gibr4n7I7sZfpyWSaalFqaEQ7BDHcL4tYkjnn3jlKxOsdCibuz64zyo3guKs31qU8eJglJXr3rXxkkNfaePI/132', '天津市天津市和平区劝业场街道花园路社区居委会');
COMMIT;

-- ----------------------------
-- Table structure for sys_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `parent_id` bigint DEFAULT NULL COMMENT '父菜单ID，一级菜单为0',
  `name` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '菜单URL',
  `perms` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '授权(多个用逗号分隔，如：user:list,user:create)',
  `component` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `type` int NOT NULL COMMENT '类型     0：目录   1：菜单   2：按钮',
  `icon` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '菜单图标',
  `orderNum` int DEFAULT NULL COMMENT '排序',
  `created` datetime NOT NULL,
  `updated` datetime DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_menu` VALUES (1, 0, '系统管理', '', 'sys:manage', '', 0, 'el-icon-s-operation', 1, '2021-01-15 18:58:18', '2021-01-15 18:58:20', 1);
INSERT INTO `sys_menu` VALUES (2, 1, '用户管理', '/sys/users', 'sys:user:list', 'sys/User', 1, 'el-icon-s-custom', 1, '2021-01-15 19:03:45', '2021-01-15 19:03:48', 1);
INSERT INTO `sys_menu` VALUES (3, 1, '角色管理', '/sys/roles', 'sys:role:list', 'sys/Role', 1, 'el-icon-rank', 2, '2021-01-15 19:03:45', '2021-01-15 19:03:48', 1);
INSERT INTO `sys_menu` VALUES (4, 1, '菜单管理', '/sys/menus', 'sys:menu:list', 'sys/Menu', 1, 'el-icon-menu', 3, '2021-01-15 19:03:45', '2021-01-15 19:03:48', 1);
INSERT INTO `sys_menu` VALUES (5, 0, '系统工具', '', 'sys:tools', NULL, 0, 'el-icon-s-tools', 2, '2021-01-15 19:06:11', NULL, 1);
INSERT INTO `sys_menu` VALUES (6, 5, '数字字典', '/sys/dicts', 'sys:dict:list', 'sys/Dict', 1, 'el-icon-s-order', 1, '2021-01-15 19:07:18', '2022-05-03 19:53:16', 0);
INSERT INTO `sys_menu` VALUES (7, 3, '添加角色', '', 'sys:role:save', '', 2, '', 1, '2021-01-15 23:02:25', '2021-01-17 21:53:14', 0);
INSERT INTO `sys_menu` VALUES (9, 2, '添加用户', NULL, 'sys:user:save', NULL, 2, NULL, 1, '2021-01-17 21:48:32', NULL, 1);
INSERT INTO `sys_menu` VALUES (10, 2, '修改用户', NULL, 'sys:user:update', NULL, 2, NULL, 2, '2021-01-17 21:49:03', '2021-01-17 21:53:04', 1);
INSERT INTO `sys_menu` VALUES (11, 2, '删除用户', NULL, 'sys:user:delete', NULL, 2, NULL, 3, '2021-01-17 21:49:21', NULL, 1);
INSERT INTO `sys_menu` VALUES (12, 2, '分配角色', NULL, 'sys:user:role', NULL, 2, NULL, 4, '2021-01-17 21:49:58', NULL, 1);
INSERT INTO `sys_menu` VALUES (13, 2, '重置密码', NULL, 'sys:user:repass', NULL, 2, NULL, 5, '2021-01-17 21:50:36', NULL, 1);
INSERT INTO `sys_menu` VALUES (14, 3, '修改角色', NULL, 'sys:role:update', NULL, 2, NULL, 2, '2021-01-17 21:51:14', NULL, 1);
INSERT INTO `sys_menu` VALUES (15, 3, '删除角色', NULL, 'sys:role:delete', NULL, 2, NULL, 3, '2021-01-17 21:51:39', NULL, 1);
INSERT INTO `sys_menu` VALUES (16, 3, '分配权限', NULL, 'sys:role:perm', NULL, 2, NULL, 5, '2021-01-17 21:52:02', NULL, 1);
INSERT INTO `sys_menu` VALUES (17, 4, '添加菜单', NULL, 'sys:menu:save', NULL, 2, NULL, 1, '2021-01-17 21:53:53', '2021-01-17 21:55:28', 1);
INSERT INTO `sys_menu` VALUES (18, 4, '修改菜单', NULL, 'sys:menu:update', NULL, 2, NULL, 2, '2021-01-17 21:56:12', NULL, 1);
INSERT INTO `sys_menu` VALUES (19, 4, '删除菜单', NULL, 'sys:menu:delete', NULL, 2, NULL, 3, '2021-01-17 21:56:36', NULL, 1);
INSERT INTO `sys_menu` VALUES (20, 0, '工作台', NULL, 'sys:other', NULL, 0, 'el-icon-s-custom', 3, '2022-04-26 16:46:18', '2022-05-06 23:09:34', 1);
INSERT INTO `sys_menu` VALUES (21, 20, '党员认证', '/party/authentication', 'sys:party:list', 'party/Authentication', 1, 'el-icon-menu', 1, '2022-04-26 16:49:40', '2022-04-27 20:07:37', 1);
INSERT INTO `sys_menu` VALUES (22, 20, '党员安排', '/party/reservation', 'sys:party:time', 'party/Reservation', 1, 'el-icon-menu', 2, '2022-04-27 19:58:36', '2022-04-27 20:32:33', 1);
INSERT INTO `sys_menu` VALUES (23, 20, '新闻(公告)编辑', '/news', 'sys:news:list', 'News', 1, 'el-icon-menu', 4, '2022-04-28 16:33:14', '2022-05-08 11:44:16', 1);
INSERT INTO `sys_menu` VALUES (24, 21, '认证通过', NULL, 'sys:party:update', NULL, 2, NULL, 1, '2022-04-30 08:49:10', NULL, 1);
INSERT INTO `sys_menu` VALUES (25, 22, '时间安排', NULL, 'sys:party:timeupdate', NULL, 2, NULL, 1, '2022-04-30 14:57:38', NULL, 1);
INSERT INTO `sys_menu` VALUES (26, 23, '添加新闻(公告)', NULL, 'sys:news:save', NULL, 2, NULL, 1, '2022-04-30 17:32:03', '2022-05-03 20:09:24', 1);
INSERT INTO `sys_menu` VALUES (27, 23, '删除新闻(公告)', NULL, 'sys:news:delete', NULL, 2, NULL, 2, '2022-04-30 18:24:36', '2022-05-03 20:09:43', 1);
INSERT INTO `sys_menu` VALUES (28, 20, '党员评价', '/party/evaluation', 'sys:party:comment', 'party/Evaluation', 1, 'el-icon-menu', 3, '2022-05-06 23:25:38', '2022-05-08 11:44:33', 1);
INSERT INTO `sys_menu` VALUES (29, 28, '审核通过', NULL, 'sys:evaluation:checkPass', NULL, 2, NULL, 1, '2022-05-08 11:47:03', '2022-05-08 11:50:04', 1);
INSERT INTO `sys_menu` VALUES (30, 28, '评论删除', NULL, 'sys:evaluation:delete', NULL, 2, NULL, 2, '2022-05-08 11:48:19', NULL, 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `code` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `remark` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL COMMENT '备注',
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE,
  UNIQUE KEY `code` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_role` VALUES (3, '普通用户', 'normal', '只有基本查看功能', '2021-01-04 10:09:14', '2021-01-30 08:19:52', 1);
INSERT INTO `sys_role` VALUES (6, '超级管理员', 'admin', '系统默认最高权限，不可以编辑和任意修改', '2021-01-16 13:29:03', '2021-01-17 15:50:45', 1);
COMMIT;

-- ----------------------------
-- Table structure for sys_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_id` bigint NOT NULL,
  `menu_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=420 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
BEGIN;
INSERT INTO `sys_role_menu` VALUES (378, 6, 1);
INSERT INTO `sys_role_menu` VALUES (379, 6, 2);
INSERT INTO `sys_role_menu` VALUES (380, 6, 9);
INSERT INTO `sys_role_menu` VALUES (381, 6, 10);
INSERT INTO `sys_role_menu` VALUES (382, 6, 11);
INSERT INTO `sys_role_menu` VALUES (383, 6, 12);
INSERT INTO `sys_role_menu` VALUES (384, 6, 13);
INSERT INTO `sys_role_menu` VALUES (385, 6, 3);
INSERT INTO `sys_role_menu` VALUES (386, 6, 7);
INSERT INTO `sys_role_menu` VALUES (387, 6, 14);
INSERT INTO `sys_role_menu` VALUES (388, 6, 15);
INSERT INTO `sys_role_menu` VALUES (389, 6, 16);
INSERT INTO `sys_role_menu` VALUES (390, 6, 4);
INSERT INTO `sys_role_menu` VALUES (391, 6, 17);
INSERT INTO `sys_role_menu` VALUES (392, 6, 18);
INSERT INTO `sys_role_menu` VALUES (393, 6, 19);
INSERT INTO `sys_role_menu` VALUES (394, 6, 5);
INSERT INTO `sys_role_menu` VALUES (395, 6, 6);
INSERT INTO `sys_role_menu` VALUES (396, 6, 20);
INSERT INTO `sys_role_menu` VALUES (397, 6, 21);
INSERT INTO `sys_role_menu` VALUES (398, 6, 24);
INSERT INTO `sys_role_menu` VALUES (399, 6, 22);
INSERT INTO `sys_role_menu` VALUES (400, 6, 25);
INSERT INTO `sys_role_menu` VALUES (401, 6, 28);
INSERT INTO `sys_role_menu` VALUES (402, 6, 29);
INSERT INTO `sys_role_menu` VALUES (403, 6, 30);
INSERT INTO `sys_role_menu` VALUES (404, 6, 23);
INSERT INTO `sys_role_menu` VALUES (405, 6, 26);
INSERT INTO `sys_role_menu` VALUES (406, 6, 27);
INSERT INTO `sys_role_menu` VALUES (407, 3, 5);
INSERT INTO `sys_role_menu` VALUES (408, 3, 6);
INSERT INTO `sys_role_menu` VALUES (409, 3, 20);
INSERT INTO `sys_role_menu` VALUES (410, 3, 21);
INSERT INTO `sys_role_menu` VALUES (411, 3, 24);
INSERT INTO `sys_role_menu` VALUES (412, 3, 22);
INSERT INTO `sys_role_menu` VALUES (413, 3, 25);
INSERT INTO `sys_role_menu` VALUES (414, 3, 28);
INSERT INTO `sys_role_menu` VALUES (415, 3, 29);
INSERT INTO `sys_role_menu` VALUES (416, 3, 30);
INSERT INTO `sys_role_menu` VALUES (417, 3, 23);
INSERT INTO `sys_role_menu` VALUES (418, 3, 26);
INSERT INTO `sys_role_menu` VALUES (419, 3, 27);
COMMIT;

-- ----------------------------
-- Table structure for sys_user
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `password` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `email` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `address` varchar(64) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `updated` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `UK_USERNAME` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
BEGIN;
INSERT INTO `sys_user` VALUES (1, 'admin', '$2a$10$PDemHhA4BkDZ3rJjKUUUaOKh9w1OSalgiYcMGaH6F0bx7u6zRh3LW', 'https://ts1.cn.mm.bing.net/th?id=OIP-C.bjNhxo1lMAPtoETCr2IsRQAAAA', '123@qq.com', '', '2021-01-12 22:13:53', '2022-05-03 21:17:10', '2020-12-30 08:38:37', 1);
INSERT INTO `sys_user` VALUES (8, '花马社区', '$2a$10$TaowfM9I4dV66M1.Ufnk/uBloxRdmoXOaMxGqLyxiIbcsbaeRQngS', 'https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg', '2548742654@qq.com', '重庆市重庆市辖区沙坪坝区虎溪街道花马社区居民委员会', '2024-02-29 20:28:27', NULL, NULL, 0);
INSERT INTO `sys_user` VALUES (11, '劳动路社区', '$2a$10$oFgOa7DJVbnQ9xxwvAoiDutGcrqCDxisIeiscyTDRNPztF5yRQfeW', 'https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg', '778866@qq.com', '重庆市重庆市辖区沙坪坝区虎溪街道劳动路社区居民委员会', '2024-04-21 20:58:03', NULL, NULL, 0);
INSERT INTO `sys_user` VALUES (13, 'poole', '$2a$10$cgFKNDvVephkOoqpewHft.A7GjSdPG9IyFhFb5SXd/3AAkZFMv572', 'https://image-1300566513.cos.ap-guangzhou.myqcloud.com/upload/images/5a9f48118166308daba8b6da7e466aab.jpg', '896880753@qq.com', '重庆市重庆市辖区沙坪坝区虎溪街道一心村社区', '2024-04-25 01:48:50', NULL, NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for sys_user_role
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
BEGIN;
INSERT INTO `sys_user_role` VALUES (4, 1, 6);
INSERT INTO `sys_user_role` VALUES (7, 1, 3);
INSERT INTO `sys_user_role` VALUES (19, 8, 3);
INSERT INTO `sys_user_role` VALUES (21, 13, 6);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
