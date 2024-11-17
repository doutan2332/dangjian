<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <el-table
        :data="tableData.filter(data => (!search || data.nickName.toLowerCase().includes(search.toLowerCase()))
        && (!value || data.status == value))"
        style="width: 100%">
      <el-table-column
          label="用户名"
          prop="nickName">
      </el-table-column>
      <el-table-column
          label="姓名"
          prop="realName">
      </el-table-column>
      <el-table-column
          label="联系电话"
          prop="telephone">
      </el-table-column>
      <el-table-column
          label="认证状态"
          prop="status">
        <template v-slot="scope">
          <el-tag size="small" v-if="scope.row.status === 0" type="info">未审</el-tag>
          <el-tag size="small" v-else-if="scope.row.status === 1" type="success">通过</el-tag>
          <el-tag size="small" v-else-if="scope.row.status === 2" type="danger">不合格</el-tag>
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
              type="success"
              v-if="scope.row.status != 1"
              @click="handleEdit(scope.$index, scope.row)">审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  党员认证对话框-->
    <el-dialog title="党员认证" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formData.nickName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="formData.realName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="formData.telephone" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="资格证明" :label-width="formLabelWidth">
          <el-image v-for="picURL in formData.picURLS" :lazy="true" :src="picURL"></el-image>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCertified(formData.openid,2)">认证打回</el-button>
        <el-button type="primary" @click="handleCertified(formData.openid,1)">认证通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "Authentication",
  data() {
    return {
      options: [{
        value: '0',
        label: '未审核'
      }, {
        value: '1',
        label: '审核通过'
      }, {
        value: '2',
        label: '审核未通过'
      }],
      value: '',
      tableData: [],
      search: '',
      dialogFormVisible: false,
      formData: {
        openid: '',
        nickName: '',
        realName: '',
        telephone: '',
        picURLS: []
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      let pics = row.picURLS.split(",");
      this.formData.openid = row._openid;
      this.formData.nickName = row.nickName;
      this.formData.realName = row.realName;
      this.formData.telephone = row.telephone;
      this.formData.picURLS = pics;
      this.dialogFormVisible = true;
    },
    handleCertified(openid, status) {
      console.log("openid",openid)
      let index = this.tableData.findIndex(data => {
        return data.openid === openid;
      });
      this.$axios.get('/party/certified/' + openid + '/' + status).then(res => {
        this.getPartyList();
      })
      this.dialogFormVisible = false;
    },
    getPartyList() {
      this.$axios.get('/party/list').then(res => {
            console.log(res);
            this.tableData = res.data.data;
          }
      )
    }
  },
  mounted() {
    this.getPartyList()
  }
}
</script>

<style scoped>
.el-image {
  width: 80%;
  height: 100%;
  object-fit: scale-down;
}
</style>
