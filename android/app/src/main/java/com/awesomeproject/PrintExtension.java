package com.les;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.net.Socket;
import java.util.Map;
import java.util.HashMap;
import java.net.InetAddress;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.BufferedWriter;
import java.io.OutputStreamWriter;

public class PrintExtension extends ReactContextBaseJavaModule {
    private static ReactApplicationContext mContext;

    public PrintExtension(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "PrintExtension";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        return constants;
    }

    /**
     * 暂时不用
     * 
     * @param ip
     * @param port
     * @param msg
     * @param promise
     */
    @ReactMethod
    public void print(String ip, Integer port, String msg, Promise promise) {
        try {
            Socket socket = new Socket(ip, port);
            if (socket.isConnected()) {
                InputStream inputStream = socket.getInputStream();
                OutputStream os = socket.getOutputStream();
                BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(os));
                bw.write(msg);
                bw.flush();
                promise.resolve("success");
            } else {
                promise.reject("error");
            }
        } catch (Exception e) {
            promise.reject("PrintError", e);
        }

    }

    @ReactMethod
    public void printerReachable(String ip, Integer timeOut, Promise promise) {
        try {
            InetAddress address = InetAddress.getByName(ip);
            if (address instanceof java.net.Inet4Address) {
                System.out.println(ip + " is ipv4 address");
            } else if (address instanceof java.net.Inet6Address) {
                System.out.println(ip + " is ipv6 address");
            } else {
                System.out.println(ip + " is unrecongized");
            }

            if (address.isReachable(timeOut == null ? 5000 : timeOut)) {
                promise.resolve("success");

            } else {
                promise.resolve("failure");

            }

        } catch (Exception e) {
            promise.reject("打印机连接失败",e);
        }
    }

    @ReactMethod
    public void printCmdByIp(String cmd, String ip, Integer port, Integer timeOut, Promise promise) {
        try {
            if (printerReachable1(ip, timeOut)) {
                Socket socket = new Socket(ip, port);
                OutputStream out = socket.getOutputStream();
                out.write(cmd.getBytes());
                out.flush();
                socket.shutdownOutput();
                socket.close();
                promise.resolve("success");
            } else {
                promise.resolve("failure");
            }
        } catch (Exception e) {
            promise.reject("打印机打印出错",e);
        }
    }

    public Boolean printerReachable1(String ip, Integer timeOut) {
        try {
            // ping this IP
            InetAddress address = InetAddress.getByName(ip);

            if (address instanceof java.net.Inet4Address) {
                System.out.println(ip + " is ipv4 address");
            } else if (address instanceof java.net.Inet6Address) {
                System.out.println(ip + " is ipv6 address");
            } else {
                System.out.println(ip + " is unrecongized");
            }

            if (address.isReachable(timeOut == null ? 5000 : timeOut)) {
                System.out.println("SUCCESS - ping " + ip + " with no interface specified");
                return true;
            } else {
                System.out.println("FAILURE - ping " + ip + " with no interface specified");
                return false;
            }
        } catch (Exception e) {
            System.out.println("连接失败" + e);
        }
        return false;
    }

}
