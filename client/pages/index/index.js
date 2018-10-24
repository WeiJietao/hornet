//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')

Page({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',

        chooseTabs: [
            { text: '个人' },
            { text: '小组' },
            { text: '附近' },
            { text: '热门' }
        ],

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
        wx.login({
            success (res) {
                if (res.code) {
                    wx.showToast({ title: '获取凭证成功' });
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        });
    }
})
