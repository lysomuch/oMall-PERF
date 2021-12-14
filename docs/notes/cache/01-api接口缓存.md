### 服务端引入缓存

服务端开发意味着缓存可作为性能优化的最直接法门，Nuxt.js作为一种服务端渲染框架，也不例外；针对不同的页面，不同的数据状态，可主要区分为下面三类缓存：

```sh
# 安装axios-extensions、LRUCache扩展
$ npm i axios-extensions LRUCache -S
# OR
$ yarn add axios-extensions LRUCache
```



1. #### API接口数据缓存

将服务端获取的数据，全部缓存到node进程内存中，定时刷新，有效期内请求都通过缓存获取API接口数据，减小数据获取时间；

此种缓存适用于缓存的部分API数据，基本保持不变，变更不频繁，与用户个人数据无关。

示例代码：

```javascript
// 第一步引入插件
import LRUCache from "lru-cache";
import { cacheAdapterEnhancer } from "axios-extensions";

// 第二步api实例化数据缓存存储对象
const CACHE = new LRUCache({
 // 最大缓存数量
 max: 1000,
 // 有效期60s
 maxAge: 1000 * 10
});

 // 第三步在plugins目录下找到axios封装的插件，缺点：接口缓存适用于get
export default ({ store, $axios, app }) => {
// 请求中使用了useCache: true 的话，会被缓存起来以便下次直接返回从而减少服务器压力
 const defaultAdapter = $axios.defaults.adapter;
 $axios.defaults.adapter = cacheAdapterEnhancer(defaultAdapter, {
	enabledByDefault: false,
	cacheFlag: "useCache", //useCache标志
	defaultCache: CACHE
 });
}
//注意 只能使用$axios.get() //这种请求方式才能获得缓存功能
//$axios({method:"get"})//无法获得缓存效果
```

具体使用如下

```javascript
// 在api请求时添加useCache标志即可，如在某个页面中
// 消息数量
inject('getUnReadMessageCount', params =>
  $axios.$get('/notice/api/station/unReadCount', {
    useCache: true,
    headers: { auth: true }
  })
);
```

只有get请求可以被缓存。默认不启用缓存机制

如果需要对数据进行修改,需要对数据进行深克隆,否则,会影响到缓存数据

```javascript
const res= awite $axios.get('xxxxxxx',{useCache:true}) 
//返回数据res={name:1,code:123}
delete res.code 
return {data:res} //第一次数据请求完成
 
//此时缓存中res为{name:1},delete影响了缓存中数据
 
深拷贝一份请求的结果
const result= JSON.parse(JSON.stringify(res)) //深拷贝一份,用这份数据delete不会影响缓存
```

