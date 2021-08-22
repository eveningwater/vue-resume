<template>
	<div class = "resumeEditor" :class="{htmlMode:enableHtml}" ref = "container">
		<div v-if="enableHtml" v-html="result"></div>
		<pre v-else>{{result}}</pre>
	</div>
</template>
<script>
	import marked from 'marked'
	export default {
		props:['markdown','enableHtml'],
		name:'ResumeEditor',
		computed:{
			result:function(){
				return this.enableHtml ? marked(this.markdown) : this.markdown
			}
		},
		methods:{
			goBottom:function(){
				this.$refs.container.scrollTop = 10000
			}
		}
	}
</script>
<style scoped>
	.htmlMode{
		anmation:flip 3s;
	}
	@keyframes flip{
		0%{
			opactiy:0;
		}
		100%{
			opactiy:1;
		}
	}
</style>