<template>
  <div>
    <div style="float: left">
      <el-select v-model="type_s"  class="m-2" placeholder="设备类型">
        <el-option
            v-for="item in typeOptions"
            :key="item.id"
            :label="item.type"
            :value="item.type"
        />
      </el-select>
      <el-select v-model="subregionName_s" style="margin-left: 20px"  class="m-2" placeholder="设备分区">
        <el-option
            v-for="item in subregionNameOptions"
            :key="item.id"
            :label="item.subregionName"
            :value="item.subregionName"
        />
      </el-select>
      <el-select v-model="value" style="margin-left: 20px" class="m-2" placeholder="设备运行状态">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </div>
    <div tyle="float: left">
      <el-button class="button_select" type="primary" style="margin-left: 20px" @click="select">搜索</el-button>
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
            label="id"
            width="50">
        </el-table-column>
        <el-table-column
            prop="type"
            label="设备类型"
            width="120">
        </el-table-column>
        <el-table-column
            prop="subregionName"
            label="分区"
            width="120">
        </el-table-column>
        <el-table-column
            prop="equipmentCode"
            label="设备编号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="statusStr"
            label="运行状态"
            width="120">
          <template #default="scope">
            <div :style="{ color: scope.row.statusStr =='异常状态' ? 'red' : 'green' }">
              {{ scope.row.statusStr }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
            prop="version"
            label="当前版本号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="cpuOccupancy"
            label="cpu占用%"
            width="100">
        </el-table-column>
        <el-table-column
            prop="memoryOccupancy"
            label="内存占用%"
            width="100">
        </el-table-column>
        <el-table-column
            prop="discOccupancy"
            label="内存占用%"
            width="100">
        </el-table-column>
        <el-table-column
            prop="netWorkStatus"
            label="网络状态"
            width="100">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="200"
            key="slot"
        >
          <template v-if="true" #default="scope">
            <el-button  @click="restart(scope,1)" type="text" size="small" v-if="scope.row.status==0 || scope.row.status==-1">开机</el-button>
            <el-button  @click="restart(scope,0)" type="text" size="small" v-else-if="scope.row.status==1">关机</el-button>
            <el-button  @click="replaceClick(scope)" type="text" size="small" v-else-if="scope.row.status==2">替换设备</el-button>
            <el-button @click="versionUpgrade(scope)" type="text" size="small" v-if="scope.row.flag">版本升级</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <el-dialog
      :modelValue="dialogVisible"
      title="设备添加分区"
      :visible="true"
      width="30%"
      :before-close="handleClose">
      <span slot="footer" class="dialog-footer">
        <div>
          <el-link :underline="false">替换设备编号:{{this.equipment_replace}}</el-link>
        </div>
        <div style="margin-top: 20px;">
          <el-link :underline="false">分区名称:{{this.subregionName_replace}}</el-link>
        </div>
        <div style="margin-top: 20px;margin-bottom: 20px">
          <el-select v-model="equipment_list"  class="m-2" placeholder="设备列表">
          <el-option
              v-for="item in subregionEquipmentList"
              :key="item.id"
              :label="item.equipmentCode"
              :value="item.equipmentCode"
          />
          </el-select>
        </div>

    <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="replace()">替换</el-button>
    </span>
  </el-dialog>
</template>

<script>

import {
  EquipmentMaintenanceList, EquipmentReplace,
  EquipmentStatusChange, EquipmentSubregionList,
  EquipmentTypeList,
  EquipmentVersionUpgrade, SubregionEquipmentList
} from "../utils/api";

export default {
  data() {
    return {
      tableData: [],
      type_s:'',
      status_s:'',
      subregionName_s:'',
      value:'',
      dialogVisible:false,
      options : [
        {
          value: '0',
          label: '停止状态',
        },
        {
          value: '1',
          label: '运行中',
        },
        {
          value: '2',
          label: '异常状态',
        }
      ],
      typeOptions:[],
      subregionNameOptions:[],

      equipment_replace:'',
      subregionName_replace:'',
      equipment_list:'',
      subregionEquipmentList:[],
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
      EquipmentMaintenanceList(this.type_s,this.subregionName_s,this.value).then(res=>{
        this.tableData = res.message;
        /*this.type_s = '';
        this.subregionName_s='';
        this.value = '';*/
      })
    },
    replaceClick(event){
      this.equipment_replace = event.row.equipmentCode;
      this.subregionName_replace = event.row.subregionName;
      SubregionEquipmentList(event.row.subregionName,event.row.type).then(res=>{
        this.subregionEquipmentList = res.message;
      })
      this.dialogVisible = true;
    },
    handleClose(){
      this.dialogVisible = false;
    },
    restart(event,status) {
      EquipmentStatusChange(event.row.id,status).then(res=>{
        alert(res.message);
        if (res.code === true) {
          this.$router.go(0)
        }
      })
    },
    replace(event) {
      EquipmentReplace(this.equipment_replace,this.equipment_list).then(res=>{
        this.dialogVisible = false;
        alert(res.message);
        if (res.code === true) {
          this.$router.go(0)
        }
      })
    },
    versionUpgrade(event) {
      EquipmentVersionUpgrade(event.row.id).then(res=>{
        alert(res.message);
        if (res.code === true) {
          this.$router.go(0)
        }
      })
    },
  },
  // 调用接口的生命周期
  mounted() {
    const that = this;
    EquipmentMaintenanceList().then(res=>{
      this.tableData = res.message
    });
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
* {
  padding: 0;
  margin: 0;
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

.input_select{
  margin-right: 20px;
}
.button_select{
  margin-top: 0;
  text-align: center;
}
.red {
  color: red !important;
}
.green {
  color: green !important;
}
</style>