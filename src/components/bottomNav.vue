<template>
	<div id="bottom">
		<a  id="pause" @click="pauseFun">{{ !paused ? '暂停动画' : '继续动画 ||' }}</a>
		<a  id="skipAnimation" @click="skipAnimationFun">跳过动画</a>
		<p>
			<span v-for="(url,index) in demourl" :key="index">
				<a :href="url.url">{{ url.title }}</a>
			</span>
		</p>
		<div id="music" @click="musicPause" :class="playing ? 'rotate' : ''" ref="music"></div>
	</div>
</template>
<script>
	export default{
		name:'bottom',
		data(){
			return{
				demourl:[
					{url:'http://eveningwater.com/',title:'个人网站'},
					{url:'https://github.com/eveningwater',title:'github'}
				],
				paused:false,//暂停
				playing:false,//播放图标动画
				autoPlaying:false,//播放音频
				audio:''
			}
		},
		mounted(){
			
		},
		methods:{
			// 播放音乐
			playMusic(){
				this.playing = true;
				this.autoPlaying = true;
				// 创建audio标签
				this.audio = new Audio();
				this.audio.loop = 'loop';
				this.audio.autoplay = 'autoplay';
				this.audio.src = "http://eveningwater.com/project/newReact-music-player/audio/%E9%BB%84%E5%9B%BD%E4%BF%8A%20-%20%E7%9C%9F%E7%88%B1%E4%BD%A0%E7%9A%84%E4%BA%91.mp3";
				this.$refs.music.appendChild(this.audio);
			},
			// 跳过动画
			skipAnimationFun(e){
				e.preventDefault();
				this.$emit('on-skip');
			},
			// 暂停动画
			pauseFun(e){
				e.preventDefault();
				this.paused = !this.paused;
				this.$emit('on-pause',this.paused);
			},
			// 暂停音乐
			musicPause(){
				this.playing = !this.playing;
				if(!this.playing){
					this.audio.pause();
				}else{
					this.audio.play();
				}
			}
		}
	}
</script>
<style scoped>
	#bottom{
		position:fixed;
		bottom:5px;
		left:0;
		right:0;
	}
	#bottom p{
		float:right;
	}
	#bottom a{
		text-decoration: none;
		color: #999;
		cursor:pointer;
		margin-left:5px;
	}
	#bottom a:hover,#bottom a:active{
		color: #010a11;
	}
</style>
