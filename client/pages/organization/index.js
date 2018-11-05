// pages/organization/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        organazationList: [
            {
                name: 'WEB_UNION',
                introduce: '国际互联网科技研究总部(世界万维网开发者联盟)',
                img: './../../images/webunion.jpg',
                actAmount: 50,
                parAmount: 200
            },
            {
                name: 'WEB_UNION',
                introduce: '国际互联网科技研究总部(世界万维网开发者联盟)',
                img: './../../images/webunion.jpg',
                actAmount: 100,
                parAmount: 100
            },
            {
                name: 'WEB_UNION',
                introduce: '国际互联网科技研究总部(世界万维网开发者联盟)',
                img: './../../images/webunion.jpg',
                actAmount: 50,
                parAmount: 50
            },
            {
                name: 'WEB_UNION',
                introduce: '国际互联网科技研究总部(世界万维网开发者联盟)',
                img: './../../images/webunion.jpg',
                actAmount: 5,
                parAmount: 10
            },
            {
                name: 'WEB_UNION',
                introduce: '国际互联网科技研究总部(世界万维网开发者联盟)',
                img: './../../images/webunion.jpg',
                actAmount: 5,
                parAmount: 10
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    // 跳转搜索页面
    onGotoSearchPage: function () {
        wx.navigateTo({ url: '/pages/search/index' });
    },

    // 跳转创建页面
    onGotoBuildPage: function () {
        wx.navigateTo({ url: '/pages/build/index' });
    }    
})