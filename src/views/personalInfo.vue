<template>
  <div style="margin: 50px 0 0 0;background-color: #AAAAAA">
    <div style="width: 200px;height:700px;float: left">

    </div>
    <div  style="width: 400px;height:700px;float: left">
      <div>
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <el-link :underline="false">{{user.name}}</el-link>
        <el-link type="success" style="margin-left: 20px" @click="showUser(user.id)">修改个人信息</el-link>
        <el-divider content-position="left">基本信息</el-divider>
        <div  class="info_div">
          <el-link :underline="false">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别:&nbsp;&nbsp;&nbsp;&nbsp;</el-link>
          <el-link :underline="false">{{user.sex}}</el-link>
        </div>
        <div  class="info_div">
          <el-link :underline="false">年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄:&nbsp;&nbsp;&nbsp;&nbsp;</el-link>
          <el-link :underline="false">{{user.age}}</el-link>
        </div>
        <div class="info_div">
          <el-link :underline="false">个性签名:&nbsp;&nbsp;&nbsp;&nbsp;</el-link>
          <el-link :underline="false">{{user.personal}}</el-link>
        </div>
        <div  class="info_div">
          <el-link :underline="false">电&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;话:&nbsp;&nbsp;&nbsp;&nbsp;</el-link>
          <el-link :underline="false">{{user.phone}}</el-link>
        </div>
        <div  class="info_div">
          <el-link :underline="false">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:&nbsp;&nbsp;&nbsp;&nbsp;</el-link>
          <el-link :underline="false">{{user.address}}</el-link>
        </div>
        <div class="info_div">
          <el-link :underline="false">婚姻状态:&nbsp;&nbsp;&nbsp;&nbsp;</el-link>
          <el-link :underline="false">{{user.marital}}</el-link>
        </div>
      </div>

    </div>
  </div>

  <el-dialog
      :modelValue="dialogUserInfo"
      title="修改个人信息"
      :visible="true"
      width="30%"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <input v-model="id_up" type="hidden"/>
        <el-input class='user_el' v-model="sex_up" clearable placeholder="性别"></el-input>
        <el-input class='user_el' v-model="age_up" clearable placeholder="年龄"></el-input>
        <el-input class='user_el' v-model="personal_up" clearable placeholder="个性签名"></el-input>
        <el-input class='user_el' v-model="phone_up" clearable placeholder="电话"></el-input>
        <el-input class='user_el' v-model="address_up" clearable placeholder="地址"></el-input>
        <el-input class='user_el' v-model="marital_up" clearable placeholder="婚姻状态"></el-input>
    <el-button type="primary" @click="dialogUserInfo = false">取 消</el-button>
    <el-button type="primary" @click="updateInfo">修改</el-button>
    </span>
  </el-dialog>
</template>

<script>

import {UpdatePersonal, UserInfo} from "../utils/api";

export default {
  components: {

  },
  data: function() {
    return {
      user:{},
      dialogUserInfo:false,
      sex_up:'',
      age_up:'',
      personal_up:'',
      phone_up:'',
      address_up:'',
      marital_up:''
    }
  },
  created() {

  },
  // 监听路由变化
  watch: {

  },
  methods: {
    showUser(){
      this.dialogUserInfo = true
      this.sex_up = this.user.sex
      this.age_up = this.user.age
      this.personal_up = this.user.personal
      this.phone_up = this.user.phone
      this.address_up = this.user.address
      this.marital_up = this.user.marital
      //this.mounted()
      console.log(item)
    },
    updateInfo() {
      UpdatePersonal(this.user.id,this.sex_up,this.age_up,this.personal_up,this.phone_up,this.address_up,this.marital_up).then(res=>{
        this.dialogUserInfo = false;
        this.$router.go(0)
      })
    },

  },
  // 调用接口的生命周期
  mounted() {
    UserInfo().then(res=>{
      this.user = res.message;
    })
  }
}


</script>

<style scoped>
.info_div{
  margin-bottom: 10px;
}

.dialog-footer button:first-child {
  margin-right: 20px;
}
.user_el{
  margin-bottom: 10px;
}
</style>