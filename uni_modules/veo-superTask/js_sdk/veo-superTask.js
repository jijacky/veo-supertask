/**
 * 并发任务执行控制，可控制并发的数量，超时时间，并按照给行的时间顺序执行
 */
class SuperTask{
    constructor(c = 2){
        this.c = c;
        this.tasks = [];
        this.runc = 0;
    }
    
    add(task){
        return new Promise((res,rej)=>{
            this.tasks.push({
                task,
                res,
                rej
            });
            this._run();
        });
    }
    
    _run(){
        while(this.runc < this.c && this.tasks.length > 0){
            const {task,res,rej} = this.tasks.shift();
            this.runc++;
            task().then(res,rej).finally(()=>{
                this.runc--;
                this._run();
            });
        }
    }
}

function timeout(cb,t=0,l=0){
    
    t = t<=0 ? 0 : t;
    l = l<=0 ? 0 : l;
    
    if(l<=0){
        return new Promise((res,rej) => {
            setTimeout(()=>{
                cb(res,rej);
            },t);
        });
    }else{
        const callback = new Promise((res,rej) => {
            setTimeout(()=>{
                cb(res,rej);
            },t);
        });
        const timer = new Promise((res,rej) => {
            setTimeout(()=>{
                setTimeout(() => rej(new Error("请求超时")), 1000);
            },t);
        });
        return Promise.race([
          callback,
          timer,
        ]);
    }

}

export default function task(c){
    
    const superTask = new SuperTask(c);
    
    function add(cb,t=0,l=0){
        superTask
        .add(()=>timeout(cb,t,l))
        .then((r)=>{
            console.log('ok',r);
        })
        .catch((r)=>{
            console.log(`e`,r);
        });
    }
    
    return {
        superTask,
        add
    };
    
}
