/**
 * local storage
 */
import {
    Alert,   
} from "react-native";

export default class Storage   {
    constructor(options = {}) {
        this.cache = new Map();
        this.defaultExpires =
            options.defaultExpires !== undefined
                ? options.defaultExpires
                : 1000 * 3600 * 24; //变量存在定时时长
    }
    set(params) {
        const {
            key,         
            data,
            expires = this.defaultExpires
        } = params;
        if (key.toString().indexOf("_") !== -1) {   //前缀的为"_"的变量不允许
            console.error('Please do not use "_" in key!');
        }
        let now = Date.now(); //获取当前时间
        let dataToSave = {};
        dataToSave = {"key": key, "data": data,"expires": now + expires};   
        this.cache.set(key,dataToSave)  ;
    }
    get(params) {
        const { key } = params;
        let now = Date.now();
        if (this.cache.get(key) !== undefined) {
            if (this.cache.get(key).expires > now) {
                return this.cache.get(key);
            } else {
               this.cache.delete(key);  
            }
        } else {
            // Alert.alert(key+"超时,请重新登陆");
            console.log(key+"超时,请重新登陆")
            return -1;
           
        }      
    }
    remove(params) {
        const { key } = params;
        this.cache.delete(key);  
    }
}
