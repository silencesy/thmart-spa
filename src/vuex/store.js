import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);


// 状态
const state={
   classId: '0',
   oneAddress: null
}
// 方法
const mutations = {
	changeclassId(state,id) {
		state.classId = id;
	},
	changeOneAddress(state,id) {
		state.oneAddress = id;
	}
}
// 过滤
const getters = {

}

// 异步
const actions = {

}

// 公开
export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions
})