<template>
	<div class="container">
		<div class="code" v-html="codeInstyleTag"></div>
		<div class="styleEditor" ref="container" contenteditable="true" @input="updateCode($event)" v-html="highlightedCode"></div>
	</div>
</template>
<script>
	import Prism from 'prismjs'
	export default {
		name:'Editor',
		props:['code'],
		computed:{
			highlightedCode:function(){
				//代码高亮
				return Prism.highlight(this.code,Prism.languages.css);
			},
			// 让代码生效
			codeInstyleTag:function(){
				return `<style>${this.code}</style>`
			}
		},
		methods:{
			goBottom(){
				this.$refs.container.scrollTop = 10000;
			},
			updateCode(e){
				this.$emit('update:code',e.target.textContent);
			}
		}
	}
</script>
<style scoped>
	.code{
		display:none;
	}
</style>