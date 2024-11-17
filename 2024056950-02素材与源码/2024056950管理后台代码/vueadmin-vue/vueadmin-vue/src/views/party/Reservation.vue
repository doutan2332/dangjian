<template>
  <div>
    <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
      <el-table-column
          label="用户名"
          prop="nickName">
      </el-table-column>
      <el-table-column
          label="真实姓名"
          prop="realName">
      </el-table-column>
      <el-table-column
          label="可选预约时间"
          width="450px"
          prop="times"
      >
        <template v-slot="scope">
          <el-tag
              v-for="time in scope.row.times"
              :key="time.name"
              closable
              :type="time.type"
              @close="handleClose(time,scope.$index)">
            {{ time.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              plain
              @click="handleEdit(scope.$index, scope.row)">查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="党员安排" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="党员用户名" :label-width="formLabelWidth">
          <el-input v-model="form.nickName" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="党员真实姓名" :label-width="formLabelWidth">
          <el-input v-model="form.realName" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-for="(d,index) in form.days" :label="d.day" :label-width="formLabelWidth">
          <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckAllChange(index)">全选</el-checkbox>
          <el-checkbox-group v-model="form.days[index].checkedTimePeriod" @change="handleCheckedTimePeriodChange">
            <el-checkbox v-for="time in timePeriod" :label="time" :key="time">{{ time }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCheckedTime(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment';

moment.locale('zh-cn');
const timePeriodOptions = ["7:30-9:30", "9:30-11:30", "11:30-12:30", "13:30-15:30", "15:30-17:30", "17:30-18:30", "19:30-21:30"];
export default {
  name: "Reservation",
  data() {
    return {
      tableData: [],
      search: '',
      dialogFormVisible: false,
      form: {
        openid: '',
        nickName: '',
        realName: '',
        days: [
          {
            day: moment(new Date()).format('YYYY/M/D(dddd)'),
            checkedTimePeriod: []
          },
          {
            day: moment(new Date()).add(1, "days").format('YYYY/M/D(dddd)'),
            checkedTimePeriod: []
          },
          {
            day: moment(new Date()).add(2, "days").format('YYYY/M/D(dddd)'),
            checkedTimePeriod: []
          }
        ],
      },
      timePeriod: timePeriodOptions,
      formLabelWidth: '120px',
      checkAll: false,
      isIndeterminate: true
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log("查看时openid", row)
      for (let i = 0; i < this.form.days.length; i++) {
        this.form.days[i].checkedTimePeriod = [];
      }
      this.dialogFormVisible = true;
      this.form.openid = row.openid;
      this.form.nickName = row.nickName;
      this.form.realName = row.realName;
      for (let i = 0; i < row.times.length; i++) {
        let day = row.times[i].name.split(' ')[0];
        let timeIndex = this.form.days.findIndex((d) => {
          return d.day === day;
        });
        if (timeIndex != -1) {
          this.form.days[timeIndex].checkedTimePeriod.push(row.times[i].name.split(' ')[1]);
        }
      }
    },
    handleClose(time, index) {
      let timeIndex = this.tableData[index].times.findIndex((e) => {
        return e.name === time.name;
      });
      if (index != -1) {
        this.tableData[index].times.splice(timeIndex, 1);
      }
    },
    handleCheckAllChange(index) {
      this.checkAll = !this.checkAll;
      this.form.days[index].checkedTimePeriod = this.checkAll ? timePeriodOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedTimePeriodChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.timePeriod.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.timePeriod.length;
    },
    handleCheckedTime(formData) {
      let data = {
        _openid: formData.openid,
        nickName: formData.nickName,
        realName: formData.realName,
        leisure: ''
      };
      formData.days.forEach(value => {
        value.checkedTimePeriod.forEach(val => {
          data.leisure += (value.day + ' ' + val + ',');
        })
      })
      this.$axios.post('/partyLeisure/update', data).then(res => {
        this.getReservationList();
      });
      this.dialogFormVisible = false;
    },
    getReservationList() {
      this.tableData = [];
      this.$axios.get('/partyLeisure/list').then(res => {
        res.data.data.forEach(d => {
          let data = {
            openid: '',
            nickName: '',
            realName: '',
            times: []
          };
          data.openid = d._openid;
          data.nickName = d.nickName;
          data.realName = d.realName;
          d.leisure.split(",").forEach(val => {
            data.times.push({name: val, type: this.changeType()})
          });
          data.times.pop();
          this.tableData.push(data);
        });
      })
    },
    changeType() {
      const type = ['success', 'info', 'warning', 'danger'];
      return type[Math.floor(Math.random() * 4)];
    }
  },
  mounted() {
    this.getReservationList();
  }
}
</script>