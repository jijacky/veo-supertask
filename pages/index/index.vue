<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">superTask 测试</text>
		</view>
        <view>
            <text>{{text}}</text>
        </view>
        <button @click="dotask()">执行</button>
	</view>
</template>

<script>
    import task from '../../uni_modules/veo-superTask/js_sdk/veo-superTask'

	export default {
		data() {
			return {
				text: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {
            dotask(){
                let t = task(3);
                t.add((res,rej)=>{res(1),console.log(`1 doing`)},10000);
                t.add((res,rej)=>{rej(2)},2000);
                t.add((res,rej)=>{rej(3)},7000);
                t.add((res,rej)=>{res(4.1);},3200,1000);
                t.add((res,rej)=>{setTimeout(() => res(4), 2000);},2000,1000);
                t.add((res,rej)=>{setTimeout(() => res(5), 100);},5000,1002);
                
                t.superTask
                .add(()=>{
                    return new Promise((res,rej) => {
                        setTimeout(()=>{
                            rej(500);
                        },500);
                    });
                })
                .then((n)=>{
                    console.log(n,`ok`);
                })
                .catch((n)=>{
                    console.log(n,`e`);
                });
            }
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	
	.text-area {
		display: flex;
		justify-content: center;
	}
	
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
