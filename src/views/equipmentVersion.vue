<template>
  <div>
    <el-button type="primary" @click="handClickModal">新增版本</el-button>
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
            width="200">
        </el-table-column>
        <el-table-column
            prop="type"
            label="设备类型"
            width="200">
        </el-table-column>
        <el-table-column
            prop="version"
            label="版本号"
            width="200">
        </el-table-column>
        <el-table-column
            prop="description"
            label="版本说明"
            width="400">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="200"
            key="slot"
        >
          <template v-if="true" #default="scope">
            <el-button  @click="handClickEdit(scope)" type="text" size="small" >修改</el-button>
            <el-button @click="deleteEquipmentVersionClick(scope)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog
      :modelValue="dialogVisible"
      title="新增设备版本"
      :visible="true"
      width="30%"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <el-input v-model="type" clearable placeholder="设备类型"></el-input>
        <el-input v-model="version" clearable placeholder="版本号"></el-input>
         <el-input
             v-model="description"
             :autosize="{ minRows: 2, maxRows: 4 }"
             type="textarea"
             placeholder="描述"
         />
    <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addEquipmentType">确 定</el-button>
    </span>
  </el-dialog>

  <el-dialog
      :modelValue="dialogVisible1"
      title="修改设备版本"
      :visible="true"
      width="30%"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <input v-model="id_up" type="hidden"/>
        <el-input v-model="type_up" clearable placeholder="设备类型"></el-input>
        <el-input v-model="version_up" clearable placeholder="版本号"></el-input>
        <el-input
            v-model="description_up"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="描述"
        />
    <el-button type="primary" @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="updateEquipmentVersion">修改</el-button>
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
        <el-button type="primary" @click="deleteEquipmentVersion()">删除</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>

import {EquipmentVersionAdd, EquipmentVersionDelete, EquipmentVersionList, EquipmentVersionUpdate} from "../utils/api";

export default {
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      deleteDialog:false,
      tableData: [],
      placeholder:'',
      type:'',
      version:'',
      description:'',

      id_up:'',
      type_up:'',
      version_up:'',
      description_up:'',
      id_delete:''

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
    handleCloseDeleteDialog(){
      this.deleteDialog = false;
    },
    addEquipmentType() {
      EquipmentVersionAdd(this.type,this.version,this.description).then(res=>{
        alert(res.message);
        if (res.code === true) {
          this.$router.go(0)
        }
      })
    },
    deleteEquipmentVersionClick(event){
      this.id_delete = event.row.id;
      this.deleteDialog = true;
    },
    deleteEquipmentVersion(){
      EquipmentVersionDelete(this.id_delete).then(res=>{
        if (res.code === true) {
          this.$router.go(0)
        }
      })
    },

    updateEquipmentVersion(event) {
      EquipmentVersionUpdate(this.id_up,this.type_up,this.description_up,this.version_up).then(res=>{
        alert(res.message);
        if (res.code === true) {
          this.$router.go(0)
        }
      })
    },
    handClickModal(item){
      this.dialogVisible = true
    },
    handleClose(){
      this.dialogVisible = false
    },
    handClickEdit(item){
      this.dialogVisible1 = true
      this.id_up = item.row.id;
      this.type_up = item.row.type;
      this.description_up = item.row.description;
      this.version_up = item.row.version;
    }
  },
  // 调用接口的生命周期
  mounted() {
    const that = this;
    EquipmentVersionList().then(res=>{
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

</style>