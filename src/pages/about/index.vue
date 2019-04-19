<template>
    <main class="about-container">
        <figure class="about-head">
            <img class="logo" src="/static/images/logo.png" />
        </figure>

        <div class="about-info">
            <p class="info-text">HornetWork 是由 WebUnion 自主开发的一款记账类微信小程序。</p>
            <p class="info-text">当前版本：1.0.0</p>
            <p class="info-text">GitHub 地址：https://github.com/WeiJietao/hornet</p>
        </div>
    </main>
</template>

<script>
export default {
    name: 'About'
};
</script>

<style scoped>
.about-container .about-head {
    position: relative;
    height: 400rpx;
    background-color: #000;
}

.about-head .logo {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 180rpx;
    height: 180rpx;
    border-radius: 180rpx;
    border: 1px solid #ffcc0b;
    margin: auto;
}

/* 关于信息 */
.about-container .about-info {
    padding: 20rpx 30rpx;
    font-size: 32rpx;
    line-height: 50rpx;
}

.about-info .info-text {
    display: block;
    width: 100%;
    margin: 25rpx 0;
}

.about-info .info-img {
    display: block;
    width: 300rpx;
    height: 300rpx;
    margin: 60rpx auto;
}
</style>
