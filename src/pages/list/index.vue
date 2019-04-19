<template>
    <main class="order-list-container">
        <image
            v-if="allOrderList.length === 0"
            class="empty-prompt"
            src="/static/images/empty.jpg" />

        <ul class="order-list">
            <li
                v-for="(item, index) in allOrderList"
                :key="index"
                class="order-item"
                @click="clickGotoDetailPage($event, allOrderList.length - index - 1)">
                <b class="item-name">{{item.orderName}}</b>
                <small class="item-time">{{item.createdDate}}</small>
            </li>
        </ul>
    </main>
</template>

<script>
export default {
    name: 'List',

    data () {
        return {
            allOrderList: []
        }
    },

    methods: {
        clickGotoDetailPage (event, index) {
            wx.navigateTo({
                url: '/pages/detail/main?oid=' + index
            });
        }
    },

    onShow () {
        // 授权校验
        wx.getSetting({
            success: (res) => {
                if (!res.authSetting['scope.userInfo']) {
                    wx.switchTab({
                        url: '/pages/index/main'
                    });
                }
            }
        });

        // 加载列表数据
        const allOrderList = wx.getStorageSync('allOrderList');
        if (allOrderList) {
            this.allOrderList = allOrderList.reverse();
        }
    }
}
</script>

<style scoped>
/* 空白提示 */
.order-list-container .empty-prompt {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 300rpx;
    height: 300rpx;
    transform: translate(-50%, -50%);
}

/* 列表 */
.order-list-container .order-list {
    padding: 0 30rpx;
}

.order-list .order-item {
    display: flex;
    border-bottom: 1rpx solid #dcdcdc;
    padding: 30rpx 0 29rpx;
    box-sizing: border-box;
}

.order-item .item-name {
    width: 65%;
    font-size: 35rpx;
}

.order-item .item-time {
    width: 35%;
    font-size: 28rpx;
    margin-top: 7rpx;
    text-align: center;
    color: #9c9c9c;
}
</style>
