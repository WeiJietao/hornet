<template>
    <main class="order-detail-container">
        <div
            v-if="orderData"
            class="order-detail-body">
            <h1 class="detail-title">{{orderData.orderName}}</h1>
            <ul class="detail-field-list">
                <li
                    v-for="(item, index) in orderData.fields"
                    :key="index"
                    class="field-item">{{item.label}}: {{item.value}}￥</li>
            </ul>
            <p class="total-line">合计：{{orderData.orderTotal}}￥</p>
            <figure class="jaggies-border" />
        </div>
    </main>
</template>

<script>
export default {
    name: 'Detail',

    data () {
        return {
            orderData: null
        };
    },

    onLoad (option) {
        const allOrderList = wx.getStorageSync('allOrderList');
        this.orderData = allOrderList[Number(option.oid)];
    }
}
</script>

<style scoped>
.order-detail-container {
    display: flex;
}

.order-detail-container .order-detail-body {
    flex: 1;
    margin: 50rpx 40rpx;
    border-left: 1px solid #acacac;
    border-right: 1px solid #acacac;
    border-top: 5px solid #ffcc0b;
}

.order-detail-body .detail-title {
    padding: 40rpx 0;
    margin: 0 25rpx;
    font-size: 38rpx;
    border-bottom: 1rpx solid #dcdcdc;
}

.order-detail-body .detail-field-list {
    padding: 0 25rpx;
}

.detail-field-list .field-item {
    font-size: 30rpx;
    margin: 30rpx 0;
}

.order-detail-body .total-line {
    text-align: right;
    margin: 0 25rpx;
    padding: 30rpx 0 50rpx;
    font-size: 30rpx;
    border-top: 1rpx solid #dcdcdc;
}

.order-detail-body .jaggies-border {
    width: 100%;
    height: 30rpx;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2sAAAAkAgMAAABqPUonAAAACVBMVEUAAAD///+srKx+djtTAAAAAXRSTlMAQObYZgAAAIJJREFUWMPtz7ENgDAQQ9GIklGYh1AwAlOwRHqaSCFT0jie4CQk+C4tF34pK0dXbhVbHymhk91NVlzU0Mn6D1tS/OpSMZfQyX6qWbLSVEw1ZIINGzZs2LBhw4YNGzZs2LBhw4YNGzZs2LBhw4YN23u2PpIUF34VPPGrUfhV7KR92fYAlRda4khMBDMAAAAASUVORK5CYII=);
    background-size: 100% 100%;
}
</style>
