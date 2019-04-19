<template>
    <main class="create-order-container">
        <div class="create-order-body">

            <!-- 列表 -->
            <ul class="order-detail-list">

                <!-- 名称 -->
                <li class="order-detail-item">
                    <div class="item-column cl">
                        <input
                            class="input full-width"
                            type="text"
                            :value="orderName"
                            placeholder="账单名称"
                            @input="inputUpdateOrderName" />
                    </div>
                </li>

                <!-- 条目 -->
                <li v-for="(item, index) in fields"
                    :key="index"
                    class="order-detail-item">

                    <!-- 条目名称 -->
                    <div class="item-column cm">
                        <input
                            class="input"
                            type="text"
                            :value="item.label"
                            placeholder="条目名称"
                            @input="inputUpdateFieldLabel($event, index)" />
                    </div>

                    <!-- 条目金额 -->
                    <div class="item-column cm">
                        <input
                            class="input"
                            type="text"
                            :value="item.value"
                            placeholder="条目金额"
                            @input="inputUpdateFieldValue($event, index)" />
                    </div>

                    <!-- 移除按钮 -->
                    <div class="item-column cs flex-center">
                        <img
                            class="icon-remove"
                            src="/static/images/subtract.png"
                            @click="clickRemoveFieldBtn(index)" />
                    </div>
                </li>
            </ul>

            <!-- 按钮 -->
            <figure
                class="create-field-btn flex-center"
                @click="clickCreateFieldBtn">
                <img class="icon-create"
                    src="/static/images/create.png" />
            </figure>
        </div>

        <div class="bottom-cont">
            <p class="total">合计：{{orderTotal}}</p>
            <div class="create-order-btn flex-center"
                @click="clickCreateOrderBtn">创&nbsp;&nbsp;&nbsp;&nbsp;建</div>
        </div>

        <!-- 授权弹窗 -->
        <div v-if="ifShowDialog" class="dialog-container">
            <div class="dialog-body">
                <h1 class="dialog-title text-center">
                    <span class="title-text">登录提示</span>
                </h1>
                <div class="dialog-cont text-center">请点击按钮获取微信授权</div>
                <button
                    class="dialog-btn"
                    open-type="getUserInfo"
                    lang="zh_CN"
                    @getuserinfo="onGotUserInfo">获取授权</button>
            </div>
        </div>
    </main>
</template>

<script>
import { formatTime } from '@/utils';
import card from '@/components/card';

export default {
    name: 'Index',

    data () {
        return {
            ifShowDialog: false,
            orderName: '',
            orderTotal: 0,
            fields: [
                {
                    label: '条目名称',
                    value: 0
                }
            ]
        }
    },

    components: {
        card
    },

    methods: {
        // 输入账单名
        inputUpdateOrderName (event) {
            this.orderName = event.target.value;
        },

        // 输入条目名称
        inputUpdateFieldLabel (event, index) {
            const item = this.fields[index];
            item.label = event.target.value;
            this.fields[index] = item;
        },

        // 输入条目金额
        inputUpdateFieldValue (event, index) {
            const item = this.fields[index];
            item.value = event.target.value;
            this.fields[index] = item;

            // 更新合计值
            let newOrderTotal = this.caculateOrderTotal();
            this.orderTotal = isNaN(newOrderTotal) ? '计算出错!' : newOrderTotal;
        },

        // 点击添加行按钮
        clickCreateFieldBtn (event) {
            this.fields.push({
                label: '条目名称',
                value: 0
            });
        },

        // 点击移除行按钮
        clickRemoveFieldBtn (index) {
            const { fields } = this;
            fields.splice(index, 1);

            if (fields.length === 0) {
                // 当字段列表为空时，填充一个占位字段数据
                fields.push({
                    label: '条目名称',
                    value: 0
                });
            }

            this.fields = fields;

            // 更新合计值
            let newOrderTotal = this.caculateOrderTotal();
            this.orderTotal = isNaN(newOrderTotal) ? '计算出错!' : newOrderTotal;
        },

        // 点击创建按钮
        clickCreateOrderBtn (event) {
            const {
                orderName,
                orderTotal,
                fields
            } = this;
            const allOrderList = wx.getStorageSync('allOrderList') || [];

            if (isNaN(Number(orderTotal))) {
                // 计算出错
                wx.showToast({
                    title: '计算出错!',
                    icon: 'none'
                });
                return;
            } else if (!orderName) {
                // 未输入账单名称
                wx.showToast({
                    title: '请输入账单名',
                    icon: 'none'
                });
                return;
            }

            // 保存缓存
            allOrderList.push({
                orderName,
                orderTotal,
                fields,
                createdDate: formatTime(new Date()).substr(0, 16)
            });
            wx.setStorageSync('allOrderList', allOrderList);

            wx.showToast({
                title: '创建成功'
            });

            wx.navigateTo({
                url: '/pages/detail/main?oid=' + (allOrderList.length - 1)
            });
        },

        // 获取授权
        onGotUserInfo (res) {
            const userInfo = res.target.userInfo;
            if (userInfo) {
                wx.setStorageSync('userInfo', userInfo);
                this.ifShowDialog = false;
            }
        },

        // 统计合计值
        caculateOrderTotal () {
            let total = 0;
            this.fields.forEach((item) => {
                total += Number(item.value || 0);
            });
            return total;
        }
    },

    beforeMount () {
        // 授权判断
        wx.getSetting({
            success: (res) => {
                this.ifShowDialog = !res.authSetting['scope.userInfo'];
            }
        });
    }
}
</script>

<style scoped>
/* 全局 */
.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* 主体 */
.create-order-container {
    display: flex;
    padding-bottom: 175rpx;
}
.create-order-container .create-order-body {
    flex: 1;
    margin: 50rpx 40rpx;
    box-shadow: 0 0 5rpx 10rpx #ececec;
}

/* 按钮 */
.create-order-body .create-field-btn {
    width: 100%;
    height: 110rpx;
    padding: 0 5rpx;
    margin-left: -5rpx;
    background-color: #000;
}
.create-field-btn .icon-create {
    width: 50rpx;
    height: 50rpx;
}

/* 列表 */
.create-order-body .order-detail-list {
    width: 100%;
    padding: 20rpx 0;
}
.order-detail-list .order-detail-item {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: 120rpx;
    padding: 0 30rpx;
}
.order-detail-item .item-column {
    display: flex;
    align-items: center;
}
.order-detail-item .item-column.cs {
    width: 10%;
}
.order-detail-item .item-column.cm {
    width: 45%;
}
.order-detail-item .item-column.cl {
    width: 100%;
}
.item-column .input {
    box-sizing: border-box;
    width: 90%;
    height: 60%;
    padding: 0 15rpx;
    border: 1rpx solid #dcdcdc;
    font-size: 30rpx;
}
.item-column .input.full-width {
    width: 100%;
}
.item-column .icon-remove {
    width: 35rpx;
    height: 35rpx;
}

/* 创建按钮 */
.create-order-container .bottom-cont {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 990;
}
.bottom-cont .total {
    background-color: #ececec;
    color: #000;
    font-size: 30rpx;
    padding: 15rpx 15rpx 10rpx;
}
.bottom-cont .create-order-btn {
    width: 100%;
    height: 110rpx;
    background-color: #ffcc0b;
    color: #000;
    font-size: 40rpx;
}
</style>
