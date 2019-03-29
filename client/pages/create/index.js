import util from './../../utils/util.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '',
        selectDate: '****-**-**',
        selectTime: '**:**',
        detail: '',
        hasSavedPlan: false,
        ifShowToast: false,
        toastText: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // // 获取已保存的数据
        // const savedPlan = wx.getStorageSync('savedPlan');

        // if (savedPlan) {
        //     const datetime = savedPlan.remindDate.split(' ');
        //     this.setData({
        //         hasSavedPlan: true,
        //         title: savedPlan.title,
        //         selectDate: datetime[0],
        //         selectTime: datetime[1],
        //         detail: savedPlan.detail                
        //     });
        // } else {
        //     this.setData({
        //         hasSavedPlan: false
        //     });
        // }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 设置提醒日期为5分钟后的时间
        if (!this.data.hasSavedPlan) {
            const nowDate = new Date();
            const datetime = new Date(nowDate.valueOf() + 300000);
            const timeStamp = util.formatTime(datetime).replace(/\//g, '-');
            this.setData({
                selectDate: timeStamp.substr(0, 10),
                selectTime: timeStamp.substr(11, 5)
            });
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    // 检验输入内容
    checkInputContent: function () {
        const data = this.data;
        let result = true;
        
        if (!data.title) {
            this.setData({
                ifShowToast: true,
                toastText: '请输入标题'
            });
            result = false;
        }
        
        if (!data.detail) {
            this.setData({
                ifShowToast: true,
                toastText: '请输入详情'
            });
            result = false;            
        }

        if (!result) {
            setTimeout(() => {
                this.setData({
                    ifShowToast: false
                });
            }, 2000);
        }

        return result;
    },

    // 选择提醒日期 年-月-日
    onChangeRemindDate: function (e) {
        this.setData({
            selectDate: e.detail.value
        });
    },

    // 选择提醒日期 时:分
    onChangeRemindTime: function (e) {
        this.setData({
            selectTime: e.detail.value
        });
    },

    // 监听输入标题
    onInputTitle: function (e) {
        this.setData({
            title: e.detail.value
        });
    },

    // 监听输入详情
    onInputDetail: function (e) {
        this.setData({
            detail: e.detail.value
        });
    },

    // 点击保存按钮
    // onClickSaveBtn: function (e) {
    //     const data = this.data;
    //     wx.setStorageSync('savedPlan', {
    //         title: data.title,
    //         remindDate: data.selectDate + ' ' + data.selectTime,
    //         detail: data.detail
    //     });
    //     wx.showToast({
    //         title: '保存成功',
    //     });
    // },

    // 点击创建按钮
    onSubmitCreateForm: function (e) {
        if (!this.checkInputContent()) return false;

        const createDate = util.formatTime(new Date()).replace(/\//g, '-').substr(0, 16);
        const data = this.data;
        const loginData = wx.getStorageSync('loginData');
        const remindDate = data.selectDate + ' ' + data.selectTime;
        let waitingPlan = wx.getStorageSync('waitingPlan') || [];
        let totalCreatedPlanAmount = parseInt(wx.getStorageSync('totalCreatedPlanAmount') || '0');

        // 最新的计划插入列表顶部
        waitingPlan.unshift({
            title: data.title,
            remindDate: remindDate,
            createDate: createDate,
            detail: data.detail,
            requestParams: {
                'touser': loginData['openid'],
                'form_id': e.detail.formId,
                'page': 'pages/index/index',
                'template_id': 'S5m7bdiAcCsIrLYlbmJmi0qOscz0DkkHureFAfnlj1M',
                'data': {
                    'keyword1': {
                        'value': data.title
                    },
                    'keyword2': {
                        'value': remindDate
                    },
                    'keyword3': {
                        'value': data.detail
                    }
                },
                'emphasis_keyword': 'keyword1.DATA'
            }
        });

        // 升序排序
        waitingPlan.sort(function(a, b) {
            const dateA = (new Date(a.remindDate)).valueOf();
            const dateB = (new Date(b.remindDate)).valueOf();
            if (dateA >= dateB) {
                return 1;
            }
            return -1;
        });

        // 更新创建计划总数
        totalCreatedPlanAmount += 1;

        wx.setStorageSync('totalCreatedPlanAmount', totalCreatedPlanAmount);
        wx.setStorageSync('waitingPlan', waitingPlan);
        wx.showToast({
            title: '创建成功',
        });
        setTimeout(() => {
            wx.switchTab({ url: '/pages/index/index' });
        }, 1000);
    }
})