//载入一些初始化的简单样式
import '../css/main.css';
import Vue from 'vue';
import Game from './components/Game.vue';
//store就是vuex里用来存储组件树用到的所有状态的对象
import store from './vuex/store';

//the main entrance
/* eslint-disable no-new */
new Vue({
	el: '#application', //在这里注入store，vue会自动将实例注入到所有子组件中
	render(h) {
		return h(Game);
	},
	store});