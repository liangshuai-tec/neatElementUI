import * as types from '../mutation-types'

// process.env.VUE_APP_BASETHEME
const state = {
    // skinName:process.env.VUE_APP_BASETHEME,
    hasLogin:false,
    refreshRoute:true,
    username:""
}


const actions = {
    changeSkin({commit}, skinName){
        if(state.skinName != skinName){
            // ...
            commit(types.SET_SKIN, skinName);
        }
    },
    setHasLogin({commit}, status){
        commit(types.SET_HAS_LOGIN, status);
    },
    goRefreshRoute({commit}, vm){
        // ...
        commit(types.SET_REFRESH_ROUTE, false)
        vm.$nextTick(() => {
            commit(types.SET_REFRESH_ROUTE, true)
        })
    },
    setUserName({commit}, status){
        commit(types.SET_USER_NAME, status)
    }
}

const getters = {
    getSkinName: state => state.skinName,
    getHasLogin: state => state.hasLogin,
    getRefreshRoute: state => state.refreshRoute,
}

const mutations = {
    [types.SET_SKIN](state, name){
        state.skinName = name
    },
    [types.SET_HAS_LOGIN](state, status){
        state.hasLogin = status
    },
    [types.SET_REFRESH_ROUTE](state, status){
        state.refreshRoute = status
    },
    [types.SET_USER_NAME](state, status){
        state.username = status
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}