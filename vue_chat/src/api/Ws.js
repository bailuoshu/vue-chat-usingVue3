let websock = null;

let global_callback = null;
let wsUri = "ws://127.0.0.1:2345";

function createWebSocket(callback) {

    if (websock == null || typeof websock !== WebSocket) {
        initWebSocket(callback);
    }
}

function initWebSocket(callback) {
    global_callback = callback;
    // 初始化websocket
    websock = new WebSocket(wsUri);
    websock.onmessage = function (e) {
        websocketonmessage(e);
    };
    websock.onclose = function (e) {
        websocketclose(e);
    };
    websock.onopen = function () {
        websocketOpen();
    };
    // 连接发生错误的回调方法
    websock.onerror = function () {
        console.log("WebSocket连接发生错误");
        //createWebSocket();啊，发现这样写会创建多个连接，加延时也不行
    };
}

// 实际调用的方法
function sendSock(agentData ) {
    if (websock.readyState === websock.OPEN) {
        // 若是ws开启状态
        websocketsend(agentData);
    } else if (websock.readyState === websock.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData);
        }, 1000);
    } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData);
        }, 1000);
    }
}

function closeSock() {
    websock.close();
}

// 数据接收
function websocketonmessage(msg) {
    //console.log("收到数据："+msg);
    console.log("收到数据："+msg);
    let result = null;
    // debugger
    if (msg.data instanceof Blob) {
        const reader = new FileReader();
        reader.readAsText(msg.data, "UTF-8");
        reader.onload = (e) => {
            result = JSON.parse(reader.result);
            //console.log("websocket收到", result);
            global_callback(result);
        };
    } else {
        result = JSON.parse(msg.data);
        //console.log("websocket收到", result);
        global_callback(result);
    }

}

// 数据发送
function websocketsend(agentData) {
    websock.send(agentData);
}

// 关闭
function websocketclose(e) {
    console.log("connection closed (" + e.code + ")");
}

function websocketOpen(e) {
    console.log('链接成功')
}

export { sendSock, createWebSocket, closeSock ,websocketonmessage};