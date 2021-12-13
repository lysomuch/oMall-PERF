## HTTP2基本概述
> HTTP2是HTTP协议的第二个版本，相较于HTTP1 速度更快、延迟更低，功能更多。 目前来看兼容性方面也算过得去，在国内有超过50%的覆盖率。

## 一、HTTP2 相比 HTTP1.1 优点如下：

**1. 解析速度快**
> 服务器解析 HTTP1.1 的请求时，必须不断地读入字节，直到遇到分隔符 CRLF 为止。而解析 HTTP2 的请求就不用这么麻烦，因为 HTTP2 是基于帧的协议，每个帧都有表示帧长度的字段。

**2. 多路复用**
>HTTP1.1 如果要同时发起多个请求，就得建立多个 TCP 连接，因为一个 TCP 连接同时只能处理一个 HTTP1.1 的请求。

>在 HTTP2 上，多个请求可以共用一个 TCP 连接，这称为多路复用。同一个请求和响应用一个流来表示，并有唯一的流 ID 来标识。 多个请求和响应在 TCP 连接中可以乱序发送，到达目的地后再通过流 ID 重新组建。

**3. 首部压缩**
HTTP2 提供了首部压缩功能。

例如有如下两个请求：

```api
// 请求1
:authority: unpkg.zhimg.com
:method: GET
:path: /za-js-sdk@2.16.0/dist/zap.js
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
cache-control: no-cache
pragma: no-cache
referer: https://www.zhihu.com/
sec-fetch-dest: script
sec-fetch-mode: no-cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36

// 请求2
:authority: zz.bdstatic.com
:method: GET
:path: /linksubmit/push.js
:scheme: https
accept: */*
accept-encoding: gzip, deflate, br
accept-language: zh-CN,zh;q=0.9
cache-control: no-cache
pragma: no-cache
referer: https://www.zhihu.com/
sec-fetch-dest: script
sec-fetch-mode: no-cors
sec-fetch-site: cross-site
user-agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36
```


从上面两个请求可以看出来，有很多数据都是重复的。如果可以把相同的首部存储起来，仅发送它们之间不同的部分，就可以节省不少的流量，加快请求的时间。

HTTP/2 在客户端和服务器端使用“首部表”来跟踪和存储之前发送的键－值对，对于相同的数据，不再通过每次请求和响应发送。

下面再来看一个简化的例子，假设客户端按顺序发送如下请求首部：

```
Header1:foo
Header2:bar
Header3:bat
```

当客户端发送请求时，它会根据首部值创建一张表：

![](https://pic2.zhimg.com/80/v2-be170562d69da5c67cfc40aa591a722d_720w.jpg)


如果服务器收到了请求，它会照样创建一张表。 当客户端发送下一个请求的时候，如果首部相同，它可以直接发送这样的首部块：

```
62 63 64
```

服务器会查找先前建立的表格，并把这些数字还原成索引对应的完整首部。

**4. 优先级**
HTTP2 可以对比较紧急的请求设置一个较高的优先级，服务器在收到这样的请求后，可以优先处理。

**5. 流量控制**
由于一个 TCP 连接流量带宽（根据客户端到服务器的网络带宽而定）是固定的，当有多个请求并发时，一个请求占的流量多，另一个请求占的流量就会少。流量控制可以对不同的流的流量进行精确控制。



**6. 服务器推送**
HTTP2 新增的一个强大的新功能，就是服务器可以对一个客户端请求发送多个响应。换句话说，除了对最初请求的响应外，服务器还可以额外向客户端推送资源，而无需客户端明确地请求。

例如当浏览器请求一个网站时，除了返回 HTML 页面外，服务器还可以根据 HTML 页面中的资源的 URL，来提前推送资源。

现在有很多网站已经开始使用 HTTP2 了，例如知乎：

![alt](https://pic2.zhimg.com/80/v2-5fc8a7961b0cbeaa0253f366489c85a9_720w.jpg)


其中 h2 是指 HTTP2 协议，http/1.1 则是指 HTTP1.1 协议。

## 二、Nginx开启HTTP2（>V1.95）

- 调整Nginx配置

  ```nginx
  // nginx.conf
  listen 443 http2;
  ```

- 重启Nginx

- ```
  nginx -s stop && nginx 
  ```

  验证效果

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fcfc9f507bfe47f2beae758cabdb8d4f~tplv-k3u1fbpfcp-watermark.awebp)

HTTP2开启后

> 多路复用避开了资源并发限制，但资源太多的情况，也会造成浏览器性能损失（Chrome进程间通信与资源数量相关）


