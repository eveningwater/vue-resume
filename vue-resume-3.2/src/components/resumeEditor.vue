<template>
    <div class="resumeEditor" ref="resumeEditor" :class="{'resumeFlip':isRenderHTML }">
        <div v-if="isRenderHTML" v-html="resumeContent"></div>
        <pre v-else>{{ resumeContent }}</pre>
    </div>
</template>
<script setup>
    import { computed, defineProps, ref } from "vue";
    import marked from "marked";
    const props = defineProps({
        content:String,
        isRenderHTML:false
    });
    const resumeEditor = ref(null);
    const resumeContent = computed(() => props.isRenderHTML ? marked(props.content) : props.content);
    const emit = defineEmits(["on-change"]);
    emit("on-change",resumeEditor);
</script>
<style lang="less" scoped>
    .resumeEditor{
        perspective: 1000px;
        overflow: auto;
    }
    .resumeFlip {
        animation: flip 3s linear;
    }
    @keyframes flip {
        0% {
            transform:rotateX(180deg);
        }
        100% {
            transform:rotateX(0deg);
        }
    }
</style>