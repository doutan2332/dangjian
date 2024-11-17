package com.zjj.utils;

import com.zjj.entity.PartyLeisure;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


//推荐算法
public class RecommendationAlgorithm
{
    public static List<String> calculate(List<PartyLeisure> allPartyLeisure, String time, String activityType) {
        // 计算权重并排序
        List<String> recommendedOpenIds = allPartyLeisure.stream()
                .filter(p -> p.getLeisure().contains(time))
                .sorted(Comparator.comparingInt(p -> calculateWeight(p, time, activityType)))
                .map(PartyLeisure::getOpenid)
                .collect(Collectors.toList());

        return recommendedOpenIds;
    }


    private static int calculateWeight(PartyLeisure partyLeisure, String time, String activityType) {
        int timeWeight = partyLeisure.getLeisure().contains(time) ? 4 : 0;//时间权重

        int activityTypeWeight = 0;

        // 如果用户选择的活动类型与党员的活动类型完全一致，则给予最高的权重值
        if (activityType.equals(partyLeisure.getActype())) {
            activityTypeWeight = 6; // 完全匹配，给予最高权重值
        } else {
            // 如果用户选择的活动类型与党员的活动类型不一致，但党员的活动类型是“全能”，则给予一定的权重值
            if ("全能".equals(partyLeisure.getActype())) {
                activityTypeWeight = 4; // 给予较低的权重值，表示对非全能类型的适配程度
            }
            // 可以根据实际情况，调整对非全能类型的权重值
        }

        return timeWeight + activityTypeWeight;
    }
}
