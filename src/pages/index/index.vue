<template>
    <main class="create-order-container">
        <div class="create-order-body">

            <!-- 列表 -->
            <ul class="order-detail-list">
                <li v-for="(item, index) in fields"
                    :key="index"
                    class="order-detail-item">

                    <!-- 标签 -->
                    <div class="item-column cm flex-center">
                        <input
                            class="input"
                            type="text"
                            :value="item.label"
                            @input="inputUpdateField($event, index, 'label')" />
                    </div>

                    <!-- 值 -->
                    <div class="item-column cm flex-center">
                        <input
                            class="input"
                            type="text"
                            :value="item.value"
                            @input="inputUpdateField($event, index, 'value')" />
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

        <div class="create-order-btn flex-center">创&nbsp;&nbsp;&nbsp;&nbsp;建</div>
    </main>
</template>

<script>
import card from '@/components/card';

export default {
    data () {
        return {
            fields: [
                {
                    label: '',
                    value: ''
                }
            ]
        }
    },

    components: {
        card
    },

    methods: {
        // 输入行信息
        inputUpdateField (event, index, label) {
            const item = this.fields[index];
            item[label] = event.target.value;
            this.fields[index] = item;
        },

        // 点击添加行按钮
        clickCreateFieldBtn (e) {
            this.fields.push({
                label: '',
                value: ''
            });
        },

        // 点击移除行按钮
        clickRemoveFieldBtn (index) {
            const { fields } = this;
            fields.splice(index, 1);

            if (fields.length === 0) {
                // 当字段列表为空时，填充一个占位字段数据
                fields.push({
                    label: '',
                    value: ''
                });
            }

            this.fields = fields;
        }
    },

    created () {
        // let app = getApp()
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
    padding: 0 20rpx;
}
.order-detail-item .item-column.cs {
    width: 10%;
}
.order-detail-item .item-column.cm {
    width: 45%;
}
.order-detail-item .item-column.cl {
    width: 70%;
}
.item-column .input {
    box-sizing: border-box;
    width: 90%;
    height: 60%;
    padding: 0 10rpx;
    border: 1rpx solid #dcdcdc;
    font-size: 30rpx;
}
.item-column .icon-remove {
    width: 35rpx;
    height: 35rpx;
}

/* 创建按钮 */
.create-order-container .create-order-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 110rpx;
    background-color: #ffcc0b;
    color: #000;
    font-size: 40rpx;
}
</style>
