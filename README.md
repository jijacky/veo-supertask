# veo-superTask

## 介绍
uniapp 的 js sdk 封装，用于并发任务控制。可控制并发的数量，超时时间，并按照给行的时间顺序执行

## 安装教程
直接 `import` 引入即可

## 使用说明

### 导入
```javascript
import task from '../../uni_modules/veo-superTask/js_sdk/veo-superTask'
```

### 生成任务控制器
```javascript
let t = task(3);
```
控制器导出两个对象
- add 方法：是对任务控制器添加任务操作的封装，可以方便的添加任务。接受3个参数 1、回调函数 2、开始时间 3、超时时间
- superTask 对象：是任务控制器对象本身，包含一个add方法，本方法接受一个返回 Promise 的方法，并且本身也返回 Promise

### add 方法示例

```javascript
t.add((res,rej)=>{res(1),console.log(`1 doing`)},10000);
t.add((res,rej)=>{rej(2)},2000);
t.add((res,rej)=>{rej(3)},7000);
t.add((res,rej)=>{res(4.1);},3200,1000);
t.add((res,rej)=>{setTimeout(() => res(4), 2000);},2000,1000);
t.add((res,rej)=>{setTimeout(() => res(5), 100);},5000,1002);
```

### add 方法示例

```javascript
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
```
    
## 仓库
> [github](https://github.com/jijacky/) https://github.com/jijacky/
