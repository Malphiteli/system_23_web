<template>
	<div>
    <div>
      <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入需要提问的问题"
          v-model="textarea">
      </el-input>
    </div>
    <div class="right-btn">
      <el-button @click="search" type="primary" icon="el-icon-search" >搜索</el-button>
    </div>
  </div>
  <div style="margin: 100px 0 0 0">
    <div v-for="item in dataList">

      <div class="item_box" v-if="item.source==='CSDN'">
        <div class="item_tit">
          <el-link type="primary">
            <a :href="item.answer" target="_blank">{{item.question}}</a>
          </el-link>
        </div>
      </div>
      <div class="item_box" v-else>
        <div class="item_tit">
          {{item.question}}
        </div>
        <div class="item_con">
          {{item.answer}}
        </div>
      </div>
    </div>
  </div>
  <el-dialog
      v-model="dialogVisible"
      title="提醒"
      width="30%"
      :before-close="handleClose"
  >
    <span>未找到相关内容，需要提交老师答疑吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button type="primary" @click="addQuestion">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

import {Search,AddQuestion} from "../utils/api";

export default {
  components: {

  },
  data: function() {
    return {
      dialogVisible: false,
      textarea:'',
      dataList:[]
    }
  },
  created() {

  },
  // 监听路由变化
  watch: {

  },
  methods: {
    search(event) {
      Search({question:this.textarea}).then(res=>{
       this.dataList = res
        console.log(res.length===0 && localStorage.Authorization !== 'null')
        if(res.length===0 && localStorage.Authorization !== 'null'){
          this.dialogVisible = true;
        }
      })
    },
    addQuestion(event) {
      AddQuestion({question:this.textarea}).then(res=>{
        this.dialogVisible = false;
        alert(res.message);
      })
    }
  },
  // 调用接口的生命周期
  mounted() {

  }
}


</script>

<style scoped>
.right-btn{
  float: right;
  margin: 10px 0 0 0;
}

.item_box{
  margin:10px 5px ;
  border: 1px solid #ccc;
  padding: 5px 20px;

}
.item_tit{
  font-size: 18px;
  font-weight: 600;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>