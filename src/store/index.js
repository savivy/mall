import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import createPersistedstate from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
		user:{}
	},
    mutations,
    actions,
	plugins: [
        createPersistedstate()
    ]
})
