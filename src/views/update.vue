<template>
  <div id="app" class="login-container">
    <div class="content">
      <div class="content_input">
        <div class="title">
          <p>修改密码</p>
        </div>
    <el-input v-model="oldPassword" clearable show-password placeholder="请输入原密码"></el-input>
    <el-input v-model="password" clearable show-password placeholder="请输入新密码"></el-input>
    <el-input v-model="checkPassword" clearable show-password placeholder="确认新密码"></el-input>
    <div class="content_button">
      <el-button type="primary" @click="update">更&nbsp;&nbsp;&nbsp;&nbsp;改</el-button>
  </div>
  </div>
  </div>
  </div>
  </template>

    <script>

    import {UpdatePasswd} from "../utils/api";

      export default {
      components: {

    },
      data: function() {
      return {
      userName:'123',
      name:'',
      password:'',
      checkPassword:'',
      oldPassword:''
    }
  },
  created() {

  },
  // 监听路由变化
  watch: {

  },
  methods: {
    update() {
      UpdatePasswd(this.oldPassword,this.password).then(res=>{
        alert(res.message);
        this.$router.push('/login')
        localStorage.Authorization = null
      })
    }
  },
  // 调用接口的生命周期
  mounted() {
  }
}


</script>

<style scoped>
.bround{
  width: 500px;
  margin-left: 400px;
  margin-top: 100px;
}

* {
  padding: 0;
  margin: 0;
}
.login-container{
  width: 100vw;
  height: 100vh;
  background-image:url('../assets/images/login_bg.png');
  background-size: cover;
  overflow: hidden;
}
.content {
  width: 500px;
  height: 500px;
  box-sizing: border-box;
  padding: 0 50px;
  border-radius: 5px;
  box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
  background: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: mymove 1s ease-in-out  alternate;
  overflow: hidden;
  transition: 1.5s;
}

@keyframes mymove {
  0% {
    width: 0px;
    height: 5px;
  }

  10% {
    width: 50px;
    height: 5px;
  }

  15% {
    width: 100px;
    height: 5px;
  }

  20% {
    width: 150px;
    height: 5px;
  }

  25% {
    width: 200px;
    height: 5px;
  }

  30% {
    width: 250px;
    height: 5px;
  }

  35% {
    width: 300px;
    height: 5px;
  }

  40% {
    width: 350px;
    height: 5px;
  }

  45% {
    width: 450px;
    height: 5px;
  }

  50% {
    width: 500px;
    height: 5px;
  }

  55% {
    height: 30px;
  }

  60% {
    height: 60px;
  }

  65% {
    height: 90px;
  }

  70% {
    height: 120px;
  }

  75% {
    height: 150px;
  }

  80% {
    height: 180px;
  }

  85% {
    height: 210px;
  }

  90% {
    height: 240px;
  }

  95% {
    height: 240px;
  }

  100% {
    height: 300px;
  }
}

.content_input {
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

}

.content_button {
  margin-top: 10px;
}

.el-input {
  margin-bottom: 25px;
}

.title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #606266;
}

.el-button--primary {
  width: 40%;
  margin-right: 8%;
}
</style>