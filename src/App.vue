<template>
  <AnimationSpeed  @on-update-speed="onUpdateSpeed" @on-show-header="onShowHeader" />
  <div class="main" :style="{ height:isShowHeader ? 'calc(100% - 60px)' : 'calc(100% - 20px)'}">
    <StyleEditor v-model:styleCode="styleCode" ref="styleEditor"/>
    <ResumeEditor :markdown="currentMarkdown" :showHTML="enableHtml" ref="resumeEditor" />
  </div>
  <BottomNav ref="bottomNav" @on-skip-animation="onSkipAnimation" @on-pause-animation="onPauseAnimation" />
</template>

<script lang="ts">
import { DefineComponent, defineComponent, getCurrentInstance, nextTick, onMounted, reactive, ref, toRefs } from 'vue'
import fullStyle from './files/style';
import fullMobileStyle from './files/styleMobile';
import me from './files/me';
import StyleEditor from './components/StyleEditor.vue';
import ResumeEditor from './components/ResumeEditor.vue';
import BottomNav from './components/BottomNav.vue';
import AnimationSpeed from './components/AnimationSpeed.vue';
import fullMarkdown from './files/me';
import { debounce } from './utils/debounce'
export default defineComponent({
  name: 'App',
  components: {
    StyleEditor,
    ResumeEditor,
    BottomNav,
    AnimationSpeed
  },
  setup(){
    const state = reactive({
       styleCode:"",
       fullStyle:fullStyle,
       currentMarkdown:"",
       fullMarkdown:me,
       timer:0,
       enableHtml:false,
       interVal:50
    })
    if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i) || window.innerWidth < 666){
      state.fullStyle = fullMobileStyle;
    }else{
      state.fullStyle = fullStyle;
    }
    const instance = getCurrentInstance();
    const loadMobileStyle = () => {
      state.fullStyle = window.innerWidth <= 666 ? fullMobileStyle : fullStyle;
      state.styleCode = state.currentMarkdown = "";
      state.enableHtml = false;
      makeResume();
    }
    const writeStyle = (n:number) => {
      return new Promise((resolve:Function) => {
        let showStyle = () => {
          let style = state.fullStyle[n];
          if(!style)return;
          let len = state.fullStyle.filter((s,i) => i <= n).map(i => i.length).reduce((r,i) => r + i,0);
          let prefixLen = len - style.length;
          if(state.styleCode.length < len) {
            let l = state.styleCode.length - prefixLen;
            let char = style.substring(l,l + 1) || " ";
            state.styleCode += char;
            if(style.substring(l - 1,l) === "\n" && instance?.refs.styleEditor){
               nextTick(() => {
                 (instance?.refs.styleEditor as DefineComponent).goBottom();
               })
            }
            state.timer = setTimeout(showStyle,state.interVal);
          }else{
            resolve();
          }
        }
        showStyle();
      })
    }
    const writeResume = () => {
      return new Promise((resolve:Function) => {
        let len = state.fullMarkdown.length;
        let showResume = () => {
          if(state.currentMarkdown.length < len){
            state.currentMarkdown = me.substring(0,state.currentMarkdown.length + 1);
            let lastChar = state.currentMarkdown[state.currentMarkdown.length - 2];
            if(lastChar === "\n" && instance?.refs.resumeEditor){
              nextTick(() => {
                (instance?.refs.resumeEditor as DefineComponent).goBottom();
              })
            }
            state.timer = setTimeout(showResume,state.interVal);
          }else{
            resolve();
          }
        }
        showResume();
      })
    }
    const writeShowHTML = () => {
      return new Promise((resolve:Function) => {
        state.enableHtml = true;
        resolve();
      })
    }
    const makeResume = async () => {
       await writeStyle(0);
       await writeResume();
       await writeStyle(1);
       await writeShowHTML();
       await writeStyle(2);
       await nextTick(() => {
         if(instance?.refs.bottomNav)(instance?.refs.bottomNav as DefineComponent).playMusic();
       })
    }
    const onSkipAnimation = () => {
       if(state.timer)clearTimeout(state.timer);
      state.fullStyle.map(f => state.styleCode += f);
      state.currentMarkdown = fullMarkdown;
      state.enableHtml = true;
      nextTick(() => {
        if(instance?.refs.resumeEditor){
          (instance?.refs.resumeEditor as DefineComponent).goBottom();
        }
        if(instance?.refs.styleEditor){
          (instance?.refs.styleEditor as DefineComponent).goBottom();
        }
        if(instance?.refs.bottomNav){
          (instance?.refs.bottomNav as DefineComponent).playMusic();
        }
      })
    }
    const onPauseAnimation = (paused) => {
      if(state.timer && paused){
        clearTimeout(state.timer);
      }else{
        makeResume();
      }
    }
    const onUpdateSpeed = (speed) => {
       state.interVal = speed.value;
    }
    const isShowHeader = ref(false);
    const onShowHeader = (bool) => {
      isShowHeader.value = bool.value;
    }
    onMounted(() => {
      window.addEventListener('resize',debounce(loadMobileStyle,100),false)
    })
    makeResume();
    return {
      ...toRefs(state),
      onSkipAnimation,
      onPauseAnimation,
      onUpdateSpeed,
      onShowHeader,
      isShowHeader
    }
  }
})
</script>

<style lang="less">
 @import "./style/app.less";
</style>
