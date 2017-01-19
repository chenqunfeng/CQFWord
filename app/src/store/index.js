import Vue from 'vue'
import Vuex from 'vuex'
import state from './module.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    mutations
})

module.exports = store