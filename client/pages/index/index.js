// index.js
import {
    $wuxToast,
    $wuxDialog,
} from '../../components/index';

Page({
    data: {
        ifShowSelectTag: false,
        selectedArea: {},
        mainTagList: [
            {
                id: 1,
                name: '推荐',
            },
        ],
        allTagList: [
            {
                id: 1,
                name: '推荐',
            },
        ],
        placeList: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 控制授权弹窗
        // wx.clearStorage(); // TEST
        const userInfo = wx.getStorageSync('userInfo');
        if (!userInfo) {
            this.showGetAuthInfoDialog();
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 获取选择区域
        const selectedArea = wx.getStorageSync('selectedArea') || {
            id: '999999',
            name: 'Hornet'
        };
        this.setData({
            selectedArea,
        });
    },

    // 展开授权弹窗
    showGetAuthInfoDialog() {
        $wuxDialog().open({
            resetOnClose: true,
            maskClosable: false,
            title: '登录提示',
            content: '请点击按钮获取微信授权',
            buttons: [
                {
                    text: '确定',
                    type: 'primary',
                    openType: 'getUserInfo',
                    onGetUserInfo(e) {
                        wx.setStorageSync('userInfo', e.detail.userInfo);
                    },
                },
            ],
        });
    },

    // 点击跳转选择区域
    onClickGotoSelectArea() {
        wx.navigateTo({ url: '/pages/area/index' });
    },

    // 切换选择标签弹窗
    onToggleSelectTagDialog() {
        const { ifShowSelectTag } = this.data;
        this.setData({
            ifShowSelectTag: !ifShowSelectTag,
        });
    },
})
