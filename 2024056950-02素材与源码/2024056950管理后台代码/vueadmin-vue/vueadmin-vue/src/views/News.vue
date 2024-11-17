<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" :value="form" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
        :data="tableData"
        stripe
        style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="300">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        width="300">
      </el-table-column>
      <el-table-column
          prop="date"
          label="发布时间"
          width="300">
      </el-table-column>
      <el-table-column
          label="操作"
          fixed="right"
          width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

    <!-- Form -->
    <el-dialog title="新闻/公告" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="党内新闻" value="党内新闻"></el-option>
            <el-option label="动态民生" value="动态民生"></el-option>
            <el-option label="公告" value="公告"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="form.content" :rows="18"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddNews(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "News",
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        id: '',
        title: '',
        type: '',
        date: '',
        content: ''
      },
      current: 1,
      size: 10,
      total: 0
    }
  },
  methods: {
    handleAdd() {
      this.dialogFormVisible = true;
      this.form = {
        id: '',
        title: '',
        type: '',
        date: '',
        content: ''
      };
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.form = row;
    },
    handleDelete(row) {
      this.$axios.get('/news/delete/'+row.id).then(res=>{
        this.getNewsList();
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.getNewsList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.current = val;
      this.getNewsList();
    },
    handleAddNews(news){
      this.$axios.post('/news/save',news).then(res=>{
        this.getNewsList();
      })
      this.dialogFormVisible = false;
    },
    getNewsList() {
      this.$axios.get('/news/list',{
        params: {
          current: this.current,
          size: this.size
        }
      }).then(res=>{
        this.tableData = res.data.data.records;
        this.size = res.data.data.size;
        this.current = res.data.data.current;
        this.total = res.data.data.total;
      })
    }
  },
  mounted() {
    this.getNewsList();
  }
}
</script>

<style scoped>

</style>