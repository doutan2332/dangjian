<template>
  <el-container>
    <el-aside width="200px">
      <SideMenu></SideMenu>
    </el-aside>
    <el-container>
      <el-header style="height: 85px">
        <strong style="font-size: x-large">星光社区服务平台后台管理系统</strong>
        <div class="header-avatar">
          <el-avatar size="medium"
                     :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link" style="font-size: 20px">
              {{userInfo.username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="{name: 'UserCenter'}">个人中心</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <Tabs></Tabs>
        <div style="margin: 0 15px;">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from "@/components/SideMenu";
import Tabs from "@/components/Tabs";
import login from "@/views/Login";
export default {
  name: "Home",
  components: {SideMenu,Tabs},
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
  }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      this.$axios.get('/sys/userInfo').then(res => {
        this.userInfo = res.data.data
      })
    },
    logout() {
      this.$axios.get('/logout').then(res => {
        localStorage.clear()
        sessionStorage.clear()

        this.$store.commit('RESET_STORE')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
.el-container {
  padding: 0;
  margin: 0;
  height: 100vh;
}

.el-dropdown-link {
  cursor: pointer;
}

.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.el-header {
  background-color: #CD5C5C;
  color: black;
  text-align: center;
  line-height: 95px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  line-height: 200px;
}

.el-main {
  color: #333;
  padding: 0;
}


a:-webkit-any-link /deep/ {
  text-decoration: none
}
</style>
