<template>
    <div class="resumeEditor" :class="{ 'htmlMode':showHTML }" ref="container">
        <div v-if="showHTML" v-html="result"></div>
        <pre v-else>{{ result }}</pre>
    </div>
</template>

<script lang="ts">
import { computed, getCurrentInstance, PropType } from 'vue'
import marked from 'marked'
export default {
    name:"ResumeEditor",
    props:{
        markdown:String as PropType<string>,
        showHTML:Boolean as PropType<boolean>
    },
    setup(props){
        const result = computed(() => props.showHTML ? marked(props.markdown) : props.markdown);
        const instance  = getCurrentInstance();
        const goBottom = () => {
            (instance?.refs.container as HTMLDivElement).scrollTop = 10000;
        }
        return {
            result,
            goBottom
        }
    }
}
</script>

<style lang="less">
    @import "../style/resume_editor.less";
</style>