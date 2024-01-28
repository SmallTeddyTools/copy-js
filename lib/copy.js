/**
 * @description Document.execCommand()复制方法(同步，复制大量数据可能需要用户权限)
 * @param {string} value 传入要复制的值
 * @return {string | MessageHandler}
 */
export const copy = (value) => {
    if (!value) return alert('复制失败')
    try {
        const tag = document.createElement('textarea')
        tag.value = value
        document.body.appendChild(tag)
        tag.select()
        document.execCommand('copy')
        alert('复制成功')
        tag.remove()
    } catch (err) {
        alert('复制失败：' + err)
    }

}

// 异步的 Clipboard API
// 如果navigator.clipboard属性返回undefined，就说明当前浏览器不支持这个 API。
// Chrome 浏览器规定，只有 HTTPS 协议的页面才能使用这个 API。

/**
 * @description 异步的 Clipboard API 复制方法
 * 如果navigator.clipboard属性返回undefined，就说明当前浏览器不支持这个 API。
 * Chrome 浏览器规定，只有 HTTPS 协议的页面才能使用这个 API。
 * @param {string} value 传入要复制的值
 * @return {string | MessageHandler}
 */
export const copy = async (value) => {
    const clipboardObj = navigator.clipboard;
    try {
        if (clipboardObj) {
            await clipboardObj.writeText(value);
            alert('复制成功')
        } else {
            alert('当前浏览器不支持这个 Clipboard API')
        }
    } catch (err) {
        alert('复制失败：' + err)
    }
}

// copy事件和paste事件
export const copy = (value) => {
    if(Event &&  Event.clipboardData) {
        Event.clipboardData.setData(typeof value, value)
        alert('复制成功')
    } else {
        alert('复制失败')
    }
}

// Permissions API 权限