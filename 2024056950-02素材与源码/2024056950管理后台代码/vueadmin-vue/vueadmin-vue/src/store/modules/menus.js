import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default ({
    state: {
        menuList: [],
        permList: [],
        hasRoute: false, //判断是否以及获取过路由菜单
        editableTabsValue: 'Index',
        editableTabs: [{
            title: '首页',
            name: 'Index',
        }]
    },
    getters: {

    },
    mutations: {
        setMenuList(state, menus) {
            state.menuList = menus
        },
        setPermList(state, perms) {
            state.permList = perms
        },

        changeRouteStatus(state, hasRoute) {
            state.hasRoute = hasRoute
        },
        addTab(state, tab) {
            let index = state.editableTabs.findIndex(e => e.name === tab.name)
            if (index === -1) {
                state.editableTabs.push({
                    title: tab.title,
                    name: tab.name
                });
            }
            state.editableTabsValue = tab.name;
        },
        RESET_STORE: (state) => {
            state.menuList = []
            state.permList = []
            state.hasRoute = false
            state.editableTabsValue = 'Index'
            state.editableTabs = [{
                title: '首页',
                name: 'Index',
            }]
        }
    },
    actions: {
    },
    modules: {
    }
})
