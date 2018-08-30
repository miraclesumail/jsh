/**
 * 配置编译环境和线上环境之间的切换
 *
 * activeServer: 当前ws地址
 * cstest: 客服测试ws地址
 * devtest: 开发测试ws地址
 * platformId: 平台ID
 *
 */
import bw from '../../config/bw.js';

let index=1   //选择第几个平台
let config = {
    // platformId:bw[index].platformId,
    platformId:8,
    url: 'ws://192.168.10.199:9280',
    index:index
}
config.url = "wss://www.jin47.com/websocket";
// config.url = "wss://bbetasia-fpms-web.neweb.me/websocket";
// if (location.protocol == "https:") config.url = "wss://" + location.host + "/websocket";

export default config
