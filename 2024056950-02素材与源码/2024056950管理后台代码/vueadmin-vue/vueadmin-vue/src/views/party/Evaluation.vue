<template>
  <div>
    <el-table
        :data="tableData.filter(data => (!search || data.nickName.toLowerCase().includes(search.toLowerCase()))
        && (!value || data.status == value))"
        style="width: 100%">
      <el-table-column
          label="居民昵称"
          prop="residentNickname">
      </el-table-column>
      <el-table-column
          label="党员昵称"
          prop="communistNickname">
      </el-table-column>
      <el-table-column
          label="评价内容"
          prop="content">
      </el-table-column>
      <el-table-column
          label="审核状态"
          prop="status">
        <template v-slot="scope">
          <el-tag size="small" v-if="scope.row.status === 0" type="info">未审</el-tag>
          <el-tag size="small" v-else-if="scope.row.status === 1" type="success">通过</el-tag>
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
          <el-button
            size="mini"
            type="success"
            v-if="scope.row.status != 1"
            @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  党员评价对话框-->
    <el-dialog title="党员评价" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="用户昵称" :label-width="formLabelWidth">
          <el-input v-model="formData.residentNickname" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="党员昵称" :label-width="formLabelWidth">
          <el-input v-model="formData.communistNickname" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="评价内容" :label-width="formLabelWidth">
          <el-input v-model="formData.content" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleCertified(formData)">认证通过</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Aualuation",
  data() {
    return {
      value: '',
      tableData: [],
      search: '',
      dialogFormVisible: false,
      formData: {
        id: '',
        openid: '',
        communistId: '',
        content: '',
        status: '',
        communistNickname: '',
        residentNickname: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.formData.id = row.id
      this.formData.openid = row.openid;
      this.formData.communistId = row.communistId;
      this.formData.content = row.content;
      this.formData.communistNickname = row.communistNickname;
      this.formData.residentNickname = row.residentNickname;
      this.dialogFormVisible = true;
    },
    handleCertified(formData) {
      console.log("认证数据:",formData)
      this.$axios.post('/evaluation/checkPass',formData).then(res => {
        this.getPartyList();
      })
      this.dialogFormVisible = false;
    },
    handleDelete(row) {
      console.log("删除id", row)
      this.$axios.get('/evaluation/delete/' + row.id).then(res => {
        this.getPartyList();
      })
    },
    getPartyList() {
      this.$axios.get('/evaluation/getEvaluationList').then(res => {
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
  width: 100%;
  height: 300px;
  object-fit: scale-down;
}
</style>
