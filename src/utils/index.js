function formatNumber (n) {
    const str = n.toString();
    return str[1] ? str : `0${str}`;
}

// 时间格式化工具
export function formatTime (date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const t1 = [year, month, day].map(formatNumber).join('-');
    const t2 = [hour, minute, second].map(formatNumber).join(':');

    return `${t1} ${t2}`;
}

// 缓存工具
export const CacheUtil = {
    getStorage (key) {
        let data = wx.getStorageSync(key);
        if (!data) {
            return null;
        } else {
            let now = new Date().getTime();
            if (now >= parseInt(data.expired)) {
                wx.removeStorageSync(key);
                return null;
            } else {
                return data.data;
            }
        }
        return;
    },
    setStorage (key, data, expired) {
        let time = new Date().getTime() + expired;
        wx.setStorageSync(key, {
            data: data,
            expired: time
        });
    },
    removeStorage (key) {
        wx.removeStorageSync(key);
    }
};
