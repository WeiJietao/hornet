<script>
export default {
    created () {
        // 调用API从本地缓存中获取数据
        /*
         * 平台 api 差异的处理方式: api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
         * 微信：mpvue === wx, mpvuePlatform === 'wx'
         * 头条：mpvue === tt, mpvuePlatform === 'tt'
         * 百度：mpvue === swan, mpvuePlatform === 'swan'
         * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
         */

        let logs
        if (mpvuePlatform === 'my') {
            logs = mpvue.getStorageSync({key: 'logs'}).data || []
            logs.unshift(Date.now())
            mpvue.setStorageSync({
                key: 'logs',
                data: logs
            })
        } else {
            logs = mpvue.getStorageSync('logs') || []
            logs.unshift(Date.now())
            mpvue.setStorageSync('logs', logs)
        }
    },
    log () {
        console.log(`log at:${Date.now()}`)
    }
}
</script>

<style>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box;
}
/* this rule will be remove */
* {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
}

/* 动画 */

@keyframes rotate-all-round {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

/* 元素对齐方式 */

.right {
    float: right;
}

/* 字体大小 */

.font-30 {
    font-size: 30rpx;
}

.font-35 {
    font-size: 35rpx;
}

.font-40 {
    font-size: 40rpx;
}

.font-45 {
    font-size: 45rpx;
}

/* 字体颜色 */

.red {
    color: #c90738;
}

.white {
    color: #ffffff;
}

.black1 {
    color: #434343;
}

.black2 {
    color: #040404;
}

/* 背景颜色 */

.bg-red {
    background-color: #c90738;
}

.bg-yellow {
    background-color: #ffcc0b;
}

.bg-black {
    background-color: #040404;
}

/* 文本对齐方式 */

.text-center {
    text-align: center;
}

/* 粗细程度 */

.bold {
    font-weight: 700;
}

/* 显示状态 */

.hide {
    display: none;
}
.show {
    display: initial;
}

/* flex完全居中 */
.flex-complete-middle {
	display: flex;
	align-items: center;
	justify-content: center;
}

/* flex竖直居中 */
.flex-vertical-middle {
	display: flex;
	align-items: center;
}

/* flex水平居中 */
.flex-horizontal-middle {
	display: flex;
	justify-content: center;
}

/* 其他 */

.bottom-border {
    border-bottom: 1px solid #dcdcdc;
}

.right-border {
    border-right: 1px solid #dcdcdc;
}

/* 页面容器 */

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
}

/* toast */

.toast {
    position: fixed;
    bottom: 50rpx;
    left: 50%;
    margin: 0 auto;
    background-color: rgba(0,0,0,0.75);
    color: #ffffff;
    font-size: 28rpx;
    line-height: 36rpx;
    padding: 15rpx 28rpx;
    transform: translateX(-50%);
    border-radius: 28rpx 28rpx;
    text-align: center;
}

/* dialog */

.dialog-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.75);
    z-index: 999;
}

.dialog-container .dialog-body {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    width: 70%;
    margin: 50% auto 0;
    background-color: #ffffff;
    transform: translateY(-25%);
}

.dialog-body .dialog-title {
    width: 100%;
    height: 120rpx;
    line-height: 120rpx;
    margin: 0 auto;
    font-size: 38rpx;
    border-bottom: 1px solid #dcdcdc;
}

.dialog-body .dialog-cont {
    width: 100%;
    padding: 70rpx 0;
    margin: 0 auto;
    font-size: 32rpx;
}

.dialog-body .dialog-btn {
    font-size: 33rpx;
    padding: 15rpx 0;
    background-color: #ffcc0b;
    color: #ffffff;
    border: 0;
    border-radius: 0;
}

/* loading */

.loading-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.25);
	z-index: 990;
}

.loading-container .loading-img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    margin: auto 0 auto -35px;
    background-image: url(data:image/png;base64,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);
    background-size: 100% 100%;
    width: 70px;
    height: 70px;
    animation: rotate-all-round 2s linear 0s infinite;
}
</style>
