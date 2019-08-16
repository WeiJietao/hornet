import area from './../../utils/area.js';

// pages/area/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchedCondition: '',
        isInited: true,
        resultCityList: [],
        historyCityList: [],
        hotCityList: [
            { "id": "820100", "name": "澳门半岛" },
            { "id": "710100", "name": "台北市" },
            { "id": "460100", "name": "海口市" },
            { "id": "810100", "name": "香港岛" },
            { "id": "310100", "name": "上海市" },
            { "id": "440100", "name": "广州市" },
            { "id": "440300", "name": "深圳市" },
            { "id": "110100", "name": "北京市" }
        ],
        allCityList: [],
        allCityNames: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取历史城市数据
        const historyCityList = wx.getStorageSync('historyCityList') || [];

        // 获取所有城市数据
        const allCityList = [];
        const allCityNames = [];

        Object.keys(area.city_list).forEach(id => {
            allCityList.push({
                id,
                name: area.city_list[id],
            });
            allCityNames.push(area.city_list[id]);
        });

        this.setData({
            allCityList,
            allCityNames,
            historyCityList,
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

    // 改变修改条件
    onChangeSearchCondition(e) {
        this.setData({
            searchedCondition: e.detail.value,
        });
    },

    // 点击搜索按钮
    onClickSearch(e) {
        const {
            searchedCondition,
            allCityList,
            allCityNames,
        } = this.data;
        const isInited = !Boolean(searchedCondition);
        const resultCityList = [];

        allCityNames.forEach((item, index) => {
            if (item.indexOf(searchedCondition) >= 0) {
                resultCityList.push(allCityList[index]);
            }
        });

        this.setData({
            isInited,
            resultCityList,
        });
    },

    // 点击选择区域
    onClickSelectArea(e) {
        const { id } = e.currentTarget.dataset;
        let historyCityList = wx.getStorageSync('historyCityList') || [];
        const selectedArea = {
            id,
            name: area.city_list[id],
        };

        // 移除重复数据
        for (let i = 0; i < historyCityList.length; i++) {
            if (historyCityList[i].id === id) {
                historyCityList.splice(i, 1);
                i--;
            }
        }

        // 保存历史搜索记录
        historyCityList.unshift(selectedArea);
        historyCityList.length = (historyCityList.length > 10)
            ? 10
            : historyCityList.length;

        wx.setStorageSync('selectedArea', selectedArea);
        wx.setStorageSync('historyCityList', historyCityList);
        wx.navigateBack();
    },
})