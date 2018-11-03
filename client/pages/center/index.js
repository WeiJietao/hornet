// pages/center/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        ifShowToast: false,
        avator: '',
        nickname: '',
        toastText: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getStorage({
            key: 'userInfo',
            success: (res) => {
                var userInfo = JSON.parse(res.data);
                this.setData({
                    avator: userInfo.avatarUrl,
                    nickname: userInfo.nickName
                });
            }
        });
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

    // 退出登录
    onLogout: function () {
        wx.clearStorageSync();
        this.onChangeToastState('成功退出登录', 2000);
    },

    // 跳转关于页面
    onGotoAboutPage: function () {
        wx.navigateTo({ url: '/pages/about/index' });
    }
})