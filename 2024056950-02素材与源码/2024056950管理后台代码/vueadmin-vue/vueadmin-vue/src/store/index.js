import Vue from 'vue'
import Vuex from 'vuex'
import menus from "@/store/modules/menus";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  getters: {
    GET_TOKEN: state => {
      return state.token
    }
  },
  mutations: {
    SET_TOKEN: (state,token) => {
      state.token = token
      localStorage.setItem('token',token)
    }
  },
  actions: {
  },
  modules: {
    menus
  }
})
