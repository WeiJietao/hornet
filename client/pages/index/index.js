//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        ifShowToast: false,
        ifShowDialog: false,
        toastText: '',

        activities: [
            {
                img: './act1.jpg',
                title: 'Activity 1',
                amount: '10',
                host: 'WJT20',
                detail: 'WJT200000000000000000000000000000000000000'
            },
            {
                img: './act2.jpg',
                title: 'Activity 2',
                amount: '100',
                host: 'WJT20',
                detail: 'WJT200000000000000000000000000000000000000'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (query) {
        // 打开设置
        // wx.openSetting({
        //     success: (res) => {
        //         console.log(res);
        //         this.onChangeToastState(JSON.stringify(res), 2000);
        //     }
        // });

        wx.getStorage({
            key: 'userInfo',
            success: (res) => {
                console.log('_success: ', res);
            },
            complete: (res) => {
                if (/data not found/.test(res.errMsg)) {
                    this.setData({
                        ifShowDialog: true
                    });
                }
            }
        });

        // 获取登录凭证
        // wx.login({
        //     success: (res) => {
        //         if (res.code) {
        //             console.log(res.code);
        //             this.onChangeToastState(res.code);
        //         } else {
        //             this.onChangeToastState('登录失败！' + res.errMsg)
        //         }
        //     }
        // });
    },

    // 切换toast显示
    onChangeToastState: function (text, len) {
        var _self = this;
        var _ifShowToast = _self.data.ifShowToast;
        var _len = len || 2000;
        
        if (!_ifShowToast) {
            // 展示一段时间后隐藏
            setTimeout(function () {
                _self.setData({ ifShowToast: false });
            }, _len);
        }

        _self.setData({
            ifShowToast: true,
            toastText: text
        });
    },

    // 点击获取用户信息按钮
    onGotUserInfo: function (res) {
        console.log('_setStorage: ', res.detail.rawData);
        wx.setStorage({
            key: 'userInfo',
            data: res.detail.rawData
        });
        this.setData({
            ifShowDialog: false
        });
    }
})
