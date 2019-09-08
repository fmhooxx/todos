<template>
  <div id="app">
    <div id="box">
      <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="getInputVal" />
      <a-button type="primary" @click="setItemList">添加事项</a-button>

      <a-list bordered :dataSource="infoList" class="dt_list">
        <a-list-item slot="renderItem" slot-scope="item">
          <!-- 复选框 -->
          <a-checkbox :checked="item.done" @change="e => { HandleChange(e, item.id) }">{{item.info}}</a-checkbox>
          <!-- 删除链接 -->
          <a slot="actions" @click="removeItem(item.id)">删除</a>
        </a-list-item>

        <!-- footer区域 -->
        <div slot="footer" class="footer">
          <!-- 未完成的任务个数 -->
          <span>{{$store.getters.Statistics}}条剩余</span>
          <!-- 操作按钮 -->
          <a-button-group>
            <a-button :type="option === 'all' ? 'primary' : 'default'" @click="changeList('all')">全部</a-button>
            <a-button :type="option === 'undone' ? 'primary' : 'default'" @click="changeList('undone')">未完成</a-button>
            <a-button :type="option === 'done' ? 'primary' : 'default'" @click="changeList('done')">已完成</a-button>
          </a-button-group>
          <!-- 把已经完成的任务清空 -->
          <a @click="clear">清除已完成</a>
        </div>
      </a-list>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch('getList')
  },
  computed: {
    ...mapState(['inputValue', 'option']),
    ...mapGetters(['infoList'])
  },
  methods: {
    getInputVal (e) {
      console.log(e.target.value)
      this.$store.commit('setInputVal', e.target.value)
    },
    // 为添加按钮绑定事件 并判断是否为空
    setItemList () {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框不能为空')
      }
      this.$store.commit('addItem')
    },
    // 根据 id 删除
    removeItem (id) {
      // console.log(id)
      this.$store.commit('remove', id)
    },
    // 改变复选框的状态
    HandleChange (e, id) {
      // console.log(e.target.checked)
      this.$store.commit('ChChange', { 
        id: id,
        status: e.target.checked
       })
    },
    // 清除已完成的数据
    clear() {
      this.$store.commit('clearDone')
    },
    // 点击切换按钮改变选项
    changeList(key) {
      this.$store.commit('changeOption', key)
    }
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}
#box {
  height: 400px;
  width: 500px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
