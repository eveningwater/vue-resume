<template>
    <div id="bottom">
        <a @click="onPauseAnimation" id="pause">{{ paused ? "继续动画" : "暂停动画"}}</a>
        <a @click="onSkipAnimation" id="skipAnimation">跳过动画</a>
        <p>
            <span v-for="(item,index) in projectUrls" :key="item.url + index">
                <a :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
            </span>
        </p>
        <div id="music" @click="musicPause" :class="{ 'rotate':playing }"></div>
    </div>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
export default {
    name:"BottomNav",
    emits:['on-pause-animation','on-skip-animation'],
    setup(props,{ emit }){
        const state = reactive({
            paused:false,
            projectUrls:[
                {
                    title:"个人网站",
                    url:"https://www.eveningwater.com/"
                },
                {
                    title:"个人项目",
                    url:"https://www.eveningwater.com/my-web-projects/"
                },
                {
                    title:"github",
                    url:"https://github.com/eveningwater/"
                },
                {
                    title:"码云",
                    url:"https://gitee.com/eveningwater"
                },
                {
                    title:"博客",
                    url:"https://www.cnblogs.com/eveningwater/"
                },
                {
                    title:"思否",
                    url:"https://segmentfault.com/u/xishui_5ac9a340a5484"
                },
                {
                    title:"掘金",
                    url:"https://juejin.im/user/5bcfd79de51d45473245dc1c"
                }
            ],
            playing:false
        })
        const onPauseAnimation = () => {
            state.paused = !state.paused;
            emit('on-pause-animation',state.paused);
        }
        const onSkipAnimation = () => {
            emit('on-skip-animation');
        }
        const audioElement = ref();
        const createAudio = () => {
            if(audioElement.value)return;
            audioElement.value = new Audio();
            audioElement.value.loop = 'loop';
            audioElement.value.autoplay = 'autoplay';
            audioElement.value.src = 'https://www.eveningwater.com/static/resouces/audio/5.mp3';
        }
        const playMusic = () => {
            state.playing = true;
            // console.log(audioElement.value)
            if(audioElement.value){
                audioElement.value.load();
            }else{
                createAudio();
            }
            setTimeout(() => {
                audioElement.value.play();
            },0)
        }
        const musicPause = () => {
            state.playing = !state.playing;
            // console.log(audioElement.value)
            audioElement.value[state.playing ? 'play' : 'pause']();
        }
        return {
            ...toRefs(state),
            onPauseAnimation,
            onSkipAnimation,
            musicPause,
            playMusic
        }
    }
}
</script>

<style>

</style>