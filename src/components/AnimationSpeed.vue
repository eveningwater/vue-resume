<template>
   <transition name="slide">
       <div class="header" v-if="isDown">
           <label class="w-inter-text">写字速度:</label>
           <input type="text" class="w-inter-input" v-model="speed" placeholder="请输入1到100的整数" v-number />
           <button type="button" class="w-inter-btn" @click="updateSpeed">修改速度</button>
       </div>
   </transition>
   <div class="down" @click="showHeader" :style="{ top:isDown ? '47px' : '10px'}"></div>
</template>

<script>
import { ref } from 'vue'
export default {
    name:"AnimationSpeed",
    emits:['on-update-speed','on-show-header'],
    setup(props,{ emit }){
        const speed = ref(50);
        const isDown = ref(false);
        const updateSpeed = () => {
            if(speed.value){
                emit('on-update-speed',speed);
            }
        }
        const showHeader = () => {
            isDown.value = !isDown.value;
            emit('on-show-header',isDown);
        }
        return {
            isDown,
            speed,
            updateSpeed,
            showHeader
        }
    }
}
</script>

<style>

</style>