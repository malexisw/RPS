import Vuex from 'vuex';
import Vue from 'vue';
import actions from './modules/actions';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        actions
    }
});