# sockjs-stomp

基于sockjs-client+stompJs实现的集合


## 安装

```
npm i @daoxin/sockjs-stomp
```

## 使用
```
import SockJsStomp from "@daoxin/sockjs-stomp";


let timer;
const accessToken = localStorage.getItem("accessToken") || "";
const headers = {
  Authorization: accessToken,
  areaId: 510812000000
};

<!-- 链接 -->
timer = setTimeout(() => {
  SockJsStomp.disconnect({
    headers,
    cb: () => {
      console.log("连接已经销毁...", 11);
    }
  });
  SockJsStomp.connect({
    url: `${localStorage.getItem("bu") || "/api"}/dp/ws/server`,
    headers,
    cb: (result, stomp) => {
      stomp.subscribe("/topic/chaotian/notify", ({body = "[]"} = {}) => {
        socketNotify?.(JSON.parse(body || "[]"));
        console.log("stomp 回调函数", body);
      });
    }
  });
}, 3000);


<!-- 销毁 -->
clearInterval(timer);
SockJsStomp.disconnect({
	headers,
	cb: () => {
	  console.log("连接已经销毁...", 22);
	}
});

```
