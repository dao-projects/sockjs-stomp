import SockJS from "sockjs-client";
import Stomp from "@daoxin/stomp";
let stomp, timer;
// 连接
const connect = ({
    url,
    headers,
    cb
}) => {
    if (!url) {
        const baseUrl = localStorage.getItem("bu") || "/api";
        url = `${baseUrl}/dp/ws/server`;
    }
    if (!headers) {
        const accessToken = localStorage.getItem("accessToken") || "";
        headers = {
            accessToken
        };
    }
    //定义连接函数
    if (stomp == null || !stomp.connected) {
        console.log(`socket连接地址：${url} : ${JSON.stringify(headers)}`);
        var sockJS = new SockJS(url);
        // 获取STOMP子协议的客户端对象
        stomp = Stomp.over(sockJS);
        // 向服务器发起websocket连接
        stomp.connect(headers, (e) => (cb && cb(e, stomp)), () => {
            console.log("[errorCallback]=>连接失败....");
            //连接失败时的回调函数，此函数重新调用连接方法，形成循环，直到连接成功
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(() => {
                connect({
                    url,
                    headers,
                    cb
                });
            }, 3000);
        });
    } else {
        console.log("当前处于连接状态");
    }
};
//销毁
const disconnect = ({
    headers,
    cb
}) => {
    if (!headers) {
        const accessToken = localStorage.getItem("accessToken") || "";
        headers = {
            accessToken
        };
    }
    if (stomp) {
        stomp.disconnect(cb, headers);
    } else {
        console.log("当前处于未连接状态");
    }
};
export default {
    connect,
    disconnect
};