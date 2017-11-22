import Vue from 'vue';
import Vuex from 'vuex';

import getters from '../getters';
import actions from '../actions';
import mutations from '../mutations';

Vue.use(Vuex);

const state = {
	leftMatched: 0,
	highestSpeed: 0,
	status: '',
	cards: [],
	elapsedMs: 0
};

export default new Vuex.store({
	state,
	actions,
	mutations,
	getters,
	strict: process.env.NODE_ENV !== 'production'
})