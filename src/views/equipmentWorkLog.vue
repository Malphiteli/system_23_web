<template>
  <div>
    <div style="float: left">
      <el-input class="input_select" v-model="equipmentCode_s" style="width: 200px" placeholder="设备编号" clearable />
    </div>
    <div tyle="float: left">
      <el-button class="button_select" type="primary" @click="select">搜索</el-button>
    </div>

  </div>
  <div style="margin-top: 30px">
    <div>
      <el-table
          :data="tableData"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}"
          style="width: 100%">
        <el-table-column
            prop="id"
            label="序号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="equipmentCode"
            label="设备编号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="cpuOccupancy"
            label="cpu占用率"
            width="150">
        </el-table-column>
        <el-table-column
            prop="memoryOccupancy"
            label="内存占用率"
            width="150">
        </el-table-column>
        <el-table-column
            prop="discOccupancy"
            label="磁盘占用率"
            width="150">
        </el-table-column>
        <el-table-column
            prop="netWorkStatus"
            label="网络状态"
            width="100">
        </el-table-column>
        <el-table-column
            prop="workLog"
            label="工作信息"
            width="300">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

import {EquipmentWorkLogList} from "../utils/api";

export default {
  data() {
    return {
      tableData: [],
      equipmentCode_s:''
    }
  },
  components: {

  },
  created() {

  },
  // 监听路由变化
  watch: {
    dialogVisible(){
    }
  },
  methods: {
    select(event) {
      EquipmentWorkLogList(this.equipmentCode_s).then(res=>{
        this.tableData = res.message
      })
    },
  },
  // 调用接口的生命周期
  mounted() {
    const that = this;
    EquipmentWorkLogList().then(res=>{
      that.tableData = res.message
    })
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
  width: 80px;
  margin-top: 10px;

}
.input_select{
  margin-right: 20px;
}
.button_select{
  margin-top: 0;
  text-align: center;
}

</style>