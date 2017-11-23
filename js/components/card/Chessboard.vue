<template>
	<div class="chessboard">
		<!-- 遍历Card组件，为每个Card传入option定制其状态；并接受一个flipped的事件hook -->
		<Card v-for="(card, index) of cards" :key="index" :option="card" v-on:flipped="onFlipped"></Card>
	</div>
</template>

<script>
	//引入Card子组件
	import Card from './Card';
	//从vuex中拿出mapAcctions和mapGetters工具
	import {mapActions,mapGetters} from 'vuex';

	import { STATUS } from '../../vuex/store/statusEnum';

	export default {
		data(){
			return {
				//初始化一个空的lastCard属性
				lastCard: null
			};
		},
		//通过mapGetters映射各getter为computed属性
		//可以响应vuex对state的mutation
		//我们压根不关心这些数据什么时候被改的
		//只管拿来用，数据和UI就是up-to-data
		//这个feel倍儿爽
		computed: {
			...mapGetters([
				'leftMatched',
				'cards',
				'status'
			])
		},
		methods: {
			//通过mapActions映射各action为local method
			...mapActions([
				'updateStatus',
				'match',
				'flipCards'	
			]),
			onFlipped(e){
				//游戏开始后，第一次翻牌时，开始为游戏计时
				if(this.status === STATUS.READY){
					this.updateStatus(STATUS.PLAYING);
				}
				//如果之前没有牌被翻开，把这张牌赋值给lastCard
				if(!this.lastCard){
					return this.lastCard = e;
				}
				//如果之前有牌被翻了，而且当前翻的这张又正好和之前那张花色相同
				if(this.lastCard !== e && this.lastCard.cardName === e.cardName){
					//将lastCard置空
					this.lastCard = null;
					//触发配对成功的action
					this.match();
					//如果棋盘内所有牌都配对完毕，出发状态变更action,并告知过关
					return this.leftMatched || this.updateStatus(STATUS.PASS);
				}
				//之前有牌被翻了，当前翻的这张花色与之前不同
				let lastCard = this.lastCard;
				this.lastCard = null;
				setTimeout(() => {
					//一秒钟后将之前那种牌，当前牌在翻回去
					this.flipCards([lastCard, e]);
				},1000);
			}
		},
		//这里只用到Card子组件
		components: {Card}
	}
</script>

<style scoped>
.chessboard {
	margin-top: 20px;
	width: 100%;
	background-color: #fff;
	height: 530px;
	border-radius: 4px;
	padding: 10px 5px;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	align-content: space-around;
}
.container:nth-child(4n) {
	margin-right: 0px;
}
@media screen and (max-width: 450px) {
	.chessboard{
		height: 480px;
		padding: 10px 0px;
	}
}
@media screen and (max-width: 370px) {
	.chessboard{
		height: 450px;
	}
}
</style>