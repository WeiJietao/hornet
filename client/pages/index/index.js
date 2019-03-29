// index.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const util = require('../../utils/util.js')

const maxHistoryAmount = 10;

Page({
    data: {
        ifShowToast: false,
        ifShowDialog: false,
        toastText: '',
        waitingPlan: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.clearStorage();

        // 控制授权弹窗
        const userInfo = wx.getStorageSync('userInfo');
        this.setData({
            ifShowDialog: !userInfo
        });

        // 获取登录信息
        wx.login({
            success: function (loginCode) {
                const appid = 'wxac9ddb669b1482b5';
                const secret = '7da9cc99168313b6655f2ca369197736';

                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + loginCode.code,
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function (res) {
                        wx.setStorageSync('loginData', res.data);
                    }
                });
            }
        });

        this.startTimer();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function (query) {
        // 清楚缓存
        // wx.clearStorage();

        this.updatePlanList();
    },

    // 更新计划列表
    updatePlanList: function () {
        const waitingPlan = wx.getStorageSync('waitingPlan') || [];
        this.setData({ waitingPlan });
    },

    // TODO 启动全局定时器，待优化
    startTimer: function () {
        getApp().checkPlanStatusTimer = setInterval(() => {
            let waitingPlan = wx.getStorageSync('waitingPlan') || [];
            const firstPlan = waitingPlan[0];

            if (firstPlan) {
                const formalTime = (new Date()).valueOf();
                const firstRemindTime = (new Date(firstPlan.remindDate)).valueOf();
                if (firstRemindTime <= formalTime) {
                    // 到了提醒时间，发送提醒消息
                    // 获取access_token
                    const appid = 'wxac9ddb669b1482b5';
                    const secret = '7da9cc99168313b6655f2ca369197736';

                    wx.request({
                        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
                        success: (res) => {
                            wx.request({
                                url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + res.data['access_token'],
                                method: 'POST',
                                data: firstPlan.requestParams,
                                success: (res) => {
                                    // 更新历史计划、进行中计划
                                    const endPlan = waitingPlan.shift();
                                    const historyPlan = wx.getStorageSync('historyPlan') || [];

                                    historyPlan.unshift(endPlan);

                                    if (historyPlan.length > maxHistoryAmount) {
                                        historyPlan.length = maxHistoryAmount;
                                    }
                                    wx.setStorageSync('waitingPlan', waitingPlan);
                                    wx.setStorageSync('historyPlan', historyPlan);
                                    this.updatePlanList();
                                },
                                fail: function (msg) {
                                    console.error(msg);
                                }
                            });
                        }
                    });
                }
            }
        }, 2000);
    },

    // 点击获取用户信息按钮
    onGotUserInfo: function (res) {
        wx.setStorageSync('userInfo', JSON.parse(res.detail.rawData));
        this.setData({
            ifShowDialog: false
        });
    },

    // 删除计划，更新进行中计划和创建计划总数
    onRemovePlan: function (e) {
        const index = e.target.dataset.index;
        const waitingPlan = wx.getStorageSync('waitingPlan');
        let totalCreatedPlanAmount = parseInt(wx.getStorageSync('totalCreatedPlanAmount'));

        waitingPlan.splice(index, 1);
        totalCreatedPlanAmount -= 1;
        wx.setStorageSync('waitingPlan', waitingPlan);
        wx.setStorageSync('totalCreatedPlanAmount', totalCreatedPlanAmount);
        this.updatePlanList();
    }
})
