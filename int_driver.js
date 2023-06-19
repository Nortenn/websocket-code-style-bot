const WebSocket = require("ws");
const proxyAgent = require('https-proxy-agent');
const fs = require("fs");
const url = require("url");
const msgpack = require("msgpack-lite")

const token = [
    '',
    '',
    ''
];

let connects = 0;
let proxies = fs.readFileSync("./proxies.txt", {encoding: "utf-8", });
    proxies = proxies.split("\r\n");

class Bot {
    constructor(){
        this.connected = false;
        this.initSocket();
    }
    initSocket() {
        const name = this.getRandomName();
        this.socket = new WebSocket(token, {
            agent: this.getRandomProxy(),
            headers: {
              'Pragma': '',
              'Origin': '',
              'Accept-Encoding': '',
              'Accept-Language': '',
              'Sec-WebSocket-Key': '',
              'Upgrade': '',
              'Cache-Control': '',
              'Sec-WebSocket-Version': '',
              'Sec-WebSocket-Extensions': ''
            }
        });
        this.socket.onopen = () => {};
        this.socket.onmessage = () => {
            if (!this.connected) {
                connects++
            }
            console.log(connects);
        }
        this.socket.onclose = () => {};
        this.socket.onerror = () => {};
    };

    getRandomProxy() {
        const URL = url.parse("http://" + proxies[Math.floor(Math.random() * proxies.length)]);
        return new proxyAgent(URL);
    };
};

new Bot();