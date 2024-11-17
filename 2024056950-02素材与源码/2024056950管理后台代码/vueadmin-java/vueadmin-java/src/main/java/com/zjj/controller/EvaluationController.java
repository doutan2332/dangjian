package com.zjj.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.zjj.common.lang.Result;
import com.zjj.entity.Evaluation;
import com.zjj.entity.Party;
import com.zjj.entity.Person;
import com.zjj.entity.User;
import com.zjj.service.EvaluationService;
import com.zjj.service.PartyService;
import com.zjj.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author zjj
 * @since 2022-05-08
 */
@RestController
@RequestMapping("/evaluation")
public class EvaluationController extends BaseController {
    @Autowired
    EvaluationService evaluationService;
    @Autowired
    PersonService personService;
    @Autowired
    PartyService partyService;
    @PostMapping("/add")
    public Result addEvaluation(@RequestBody Evaluation evaluation)
    {
        if (evaluation != null) {
            evaluationService.save(evaluation);
            return Result.success("操作成功");
        }
        return Result.fail("操作失败");
    }

    //删除评价
    @GetMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('sys:evaluation:delete')")
    public Result deleteEvaluation(@PathVariable("id") Integer id) {
        Evaluation evaluation = evaluationService.getById(id);
        if (evaluation != null) {
            evaluationService.removeById(id);
            return Result.success("操作成功");
        }
        return Result.fail("删除评论失败");
    }
    //审核通过
    @PostMapping("/checkPass")
    @PreAuthorize("hasAuthority('sys:evaluation:checkPass')")
    public Result checkPass(@RequestBody Evaluation evaluation) {
        if(evaluation == null) {
            return Result.fail("操作失败");
        }
        Evaluation evaluation1 = evaluationService.getById(evaluation.getId());
        if (evaluation1 != null) {
            evaluation1.setStatus(1);
            evaluationService.updateById(evaluation1);
            return Result.success("操作成功");
        }
        return Result.fail("操作失败");
    }
    //根据用户和党员的openid获取该用户评价的信息
    @GetMapping("/getEvaluations")
    public Result getEvaluation(@RequestParam(name = "_openid") String openid,@RequestParam(name = "communist_id") String communistid) {
        Map<String,String> map = new HashMap<>();
        map.put("openid",openid);
        map.put("communist_id",communistid);
        List<Evaluation> list = evaluationService.list(new QueryWrapper<Evaluation>().allEq(map));
        return Result.success(list);
    }

    //前端根据管理员地址查询需要审核的党员评价
    @GetMapping("/getEvaluationList")
    @PreAuthorize("hasAuthority('sys:party:comment')")
    public Result getEvaluationList(Principal principal) {
        String name = principal.getName();
        User user = userService.getByUsername(name);
        List<Evaluation> evaluations = evaluationService.getEvaluationListByAddress(user.getAddress());
        evaluations.forEach(evaluation -> {
            evaluation.setResidentNickname(personService.getOne(new QueryWrapper<Person>().eq("openid",evaluation.getOpenid())).getNickName());
            evaluation.setCommunistNickname(partyService.getOne(new QueryWrapper<Party>().eq("openid",evaluation.getCommunistId())).getNickName());
        });
        return Result.success(evaluations);
    }
}
