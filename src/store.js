import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    list: [],
    // 文本框的值
    inputValue: '',
    nextId: 5,
    // 默认选中的是全部的任务按钮
    option: 'all'
  },
  mutations: {
    initList (state, list) {
      state.list = list
    },
    // 为 store 中的 inputValue 赋值
    setInputVal (state, val) {
      state.inputValue = val
    },
    // 添加列表项
    addItem (state) {
      let obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      state.list.push(obj)
      state.nextId++
    },
    // 根据 id 删除数据
    remove (state, id) {
      // 根据 id 找到索引号
      let i = state.list.findIndex(item => item.id === id)
      // 根据索引号删除
      state.list.splice(i, 1)
    },
    // 改变复选框的状态
    ChChange (state, o) {
      state.list.forEach(item => {
        if (item.id === o.id) {
          item.done = o.status
        }
      })
    },
    // 清除已完成的数据
    clearDone (state) {
      state.list = state.list.filter(item => item.done === false)
    },
    // 点击切换按钮选项
    changeOption (state, key) {
      state.option = key
    }
  },
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    // 统计未完成的任务条数
    Statistics (state) {
      return state.list.filter(item => item.done === false).length
    },
    // 根据按钮的切换 改变数据
    infoList (state) {
      if (state.option === 'all') {
        return state.list
      }
      if (state.option === 'undone') {
        return state.list.filter(item => item.done === false)
      }
      if (state.option === 'done') {
        return state.list.filter(item => item.done === true)
      }
    }
  }
})
