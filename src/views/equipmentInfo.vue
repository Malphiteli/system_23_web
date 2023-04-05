<template>
  <div>
    <el-button type="primary" @click="handClickModal">新增设备</el-button>
  </div>
  <div>
    <div style="float: left">
      <el-select v-model="type_s" style="margin-left: 20px;margin-top: 20px" class="m-2" placeholder="设备类型">
        <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.type"
            :value="item.type"
        />
      </el-select>
      <el-select v-model="subregionName_s" style="margin-left: 20px;margin-top: 20px" class="m-2" placeholder="分区名称">
        <el-option
            v-for="item in subregionNameOptions"
            :key="item.id"
            :label="item.subregionName"
            :value="item.subregionName"
        />
      </el-select>
    </div>
    <div tyle="float: left">
      <el-button class="button_select" type="primary" style="margin-left: 20px;margin-top: 20px" @click="select">搜索</el-button>
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
            width="80">
        </el-table-column>
        <el-table-column
            prop="type"
            label="设备类型"
            width="120">
        </el-table-column>
        <el-table-column
            prop="subregionName"
            label="分区名称"
            width="150">
        </el-table-column>
        <el-table-column
            prop="equipmentCode"
            label="设备编号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="ip"
            label="设备IP"
            width="150">
        </el-table-column>
        <el-table-column
            prop="cpu"
            label="CPU"
            width="80">
        </el-table-column>
        <el-table-column
            prop="memory"
            label="内存"
            width="80">
        </el-table-column>
        <el-table-column
            prop="disc"
            label="磁盘"
            width="80">
        </el-table-column>
        <el-table-column
            prop="statusStr"
            label="设备状态"
            width="150">
          <template #default="scope">
            <div :style="{ color: scope.row.statusStr =='异常状态' ? 'red' : 'green' }">
              {{ scope.row.statusStr }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="200"
            key="slot"
        >
          <template v-if="true" #default="scope">
            <el-button  @click="handClickEdit(scope)" type="text" size="small" v-if="scope.row.status!=3">修改</el-button>
            <el-button @click="deleteEquipmentInfoClick(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog
      :modelValue="dialogVisible"
      title="新增设备信息"
      :visible="true"
      width="30%"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-select v-model="subregionName" style="width:420px;margin-bottom: 20px" class="m-2" placeholder="分区名称">
        <el-option
            v-for="item in subregionNameOptions"
            :key="item.id"
            :label="item.subregionName"
            :value="item.subregionName"
        />
        </el-select>
        <el-select v-model="type" class="m-2" style="width:420px;margin-bottom: 20px" placeholder="设备类型">
        <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.type"
            :value="item.type"
        />
        </el-select>
        <el-input v-model="ip" clearable placeholder="设备ip"></el-input>

        <el-input v-model="cpu" clearable placeholder="CPU"></el-input>
        <el-input v-model="memory" clearable placeholder="内存"></el-input>
        <el-input v-model="disc" clearable placeholder="磁盘"></el-input>
<!--        <el-input v-model="netStatus" clearable placeholder="网络状态"></el-input>-->
    <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addEquipmentInfo">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog
      :modelValue="dialogVisible1"
      title="修改设备信息"
      :visible="true"
      width="30%"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <input v-model="id_up" type="hidden"/>

        <el-select v-model="subregionName_up" style="width:420px;margin-bottom: 20px" class="m-2" placeholder="分区名称">
        <el-option
            v-for="item in subregionNameOptions"
            :key="item.id"
            :label="item.subregionName"
            :value="item.subregionName"
        />
        </el-select>
        <el-select v-model="type_up" class="m-2" style="width:420px;margin-bottom: 20px" placeholder="设备类型">
        <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.type"
            :value="item.type"
        />
        </el-select>

        <el-input v-model="ip_up" clearable placeholder="设备ip"></el-input>

        <el-input v-model="cpu_up" clearable placeholder="CPU"></el-input>
        <el-input v-model="memory_up" clearable placeholder="内存"></el-input>
        <el-input v-model="disc_up" clearable placeholder="磁盘"></el-input>
<!--        <el-input v-model="netStatus_up" clearable placeholder="网络状态"></el-input>-->

    <el-button type="primary" @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="updateEquipmentInfo">修改</el-button>
    </span>
  </el-dialog>


  <el-dialog
      v-model="deleteDialog"
      title="提醒"
      width="30%"
      :before-close="handleCloseDeleteDialog"
  >
    <span>确认删除？</span>
    <template #footer>
      <span class="dialog-footer">
        <input v-model="id_delete" type="hidden"/>
        <el-button type="primary" @click="deleteDialog = false">取消</el-button>
        <el-button type="primary" @click="deleteEquipmentInfo()">删除</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>

import {
  EquipmentInfoList,
  EquipmentInfoAdd,
  EquipmentInfoDelete,
  EquipmentInfoUpdate,
  EquipmentTypeList, EquipmentSubregionList, EquipmentMaintenanceList
} from "../utils/api";

export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      deleteDialog:false,
      tableData: [],
      placeholder:'',
      typeOptions:[],
      subregionNameOptions:[],


      subregionName:'',
      type:'',
      ip:'',
      cpu:'',
      memory:'',
      disc:'',
      /*netStatus:'',*/

      id_up:'',
      subregionName_up:'',
      type_up:'',
      ip_up:'',
      cpu_up:'',
      memory_up:'',
      disc_up:'',
      /*netStatus_up:'',*/

      type_s:'',
      subregionName_s:'',
      id_delete:'',
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
      EquipmentInfoList(this.type_s,this.subregionName_s).then(res=>{
        this.tableData = res.message;
        /*this.type_s = '';
        this.subregionName_s='';*/
      })
    },
    handleCloseDeleteDialog(){
      this.deleteDialog = false;
    },
    addEquipmentInfo() {
      EquipmentInfoAdd(this.subregionName,this.type,this.ip,this.cpu,this.memory,this.disc).then(res=>{
        alert(res.message);
        if (res.code === true) {
          this.$router.go(0)
        }
      })
    },
    deleteEquipmentInfoClick(event){
      this.id_delete = event.row.id;
      this.deleteDialog = true;
    },
    deleteEquipmentInfo(){
      EquipmentInfoDelete(this.id_delete).then(res=>{
        if (res.code === true) {
          this.$router.go(0)
        }
      })
    },

    updateEquipmentInfo(event) {
      EquipmentInfoUpdate(this.id_up,this.subregionName_up,this.type_up,this.ip_up,this.cpu_up,this.memory_up,this.disc_up).then(res=>{
        alert(res.message);
        if (res.code === true) {
          this.$router.go(0)
        }
      })
    },
    handClickModal(item){
      /*EquipmentTypeList().then(res=>{
        this.typeOptions = res.message;
      });
      EquipmentSubregionList().then(res=>{
        this.subregionNameOptions = res.message;
      });*/

      this.dialogVisible = true
    },
    handleClose(){
      this.dialogVisible = false
    },
    handClickEdit(item){
      /*EquipmentTypeList().then(res=>{
        this.typeOptions = res.message;
      });
      EquipmentSubregionList().then(res=>{
        this.subregionNameOptions = res.message;
      });*/
      this.dialogVisible1 = true
      this.id_up = item.row.id;
      this.subregionName_up = item.row.subregionName;
      this.type_up = item.row.type;
      this.ip_up=item.row.ip;
      this.cpu_up=item.row.cpu;
      this.memory_up=item.row.memory;
      this.disc_up=item.row.disc;
      this.netStatus_up=item.row.netStatus;
    }
  },
  // 调用接口的生命周期
  mounted() {
    const that = this;
    EquipmentInfoList().then(res=>{
      that.tableData = res.message
    })

    EquipmentTypeList().then(res=>{
      this.typeOptions = res.message;
    });
    EquipmentSubregionList().then(res=>{
      this.subregionNameOptions = res.message;
    });
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
.red {
  color: red !important;
}
.green {
  color: green !important;
}
</style>