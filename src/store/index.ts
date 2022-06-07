import Vue from 'vue'
import Vuex from 'vuex'
import cloudTravel from './cloudTravel/index';
import { VuexState } from './types';

Vue.use(Vuex);

export default new Vuex.Store<VuexState>({
  modules: {
    cloudTravel
  }
})
