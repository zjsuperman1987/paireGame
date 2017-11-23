<template>
    <div class="game-panel">
        <!-- 组装上，中，下三个部分组件 -->
        <Dashboard></Dashboard>
        <Chessboard></Chessboard>
        <Status></Status>
    </div>
</template>

<script>
import Dashboard from './dashboard/Dashboard';
import Chessboard from './card/Chessboard';
import Status from './footer/PlayStatus';

// 从vuex中拿出mapActions工具
import {mapActions} from 'vuex';
//状态枚举
import {STATUS} from '../vuex/store/statusEnum';

export default {
   //通过mapActions将actions映射到methods里
   methods: {
    ...mapActions([
        'updateStatus',
        'reset'
    ])
   },
   //生命周期钩子，组件实例创建后自动被调用
   created(){
        //触发一个状态更新的action
        this.updateStatus(STATUS.READY);
        //触发一个游戏重置的action
        this.reset();
   },
   //子组件注入
   components: {Chessboard,Status}
}
</script>

<style scoped>
.game-panel{
    width: 450px;
    height: 670px;
    border: 4px solid #BDBDBD;
    border-radius: 2px;
    background-color: #faf8ef;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

@media screen and (max-width: 450px){
    .game-panel{
        width: 100%;
        height: 100%;
        justify-content: space-around;
    }
}
</style>