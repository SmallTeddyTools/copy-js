/**
 * @description Document.execCommand()复制方法(同步，复制大量数据可能需要用户权限)
 * @param {string} value 传入要复制的值
 * @return {string | MessageHandler}
 */
export function execCommandCopy(value) {
    if (!value) {
        return alert('复制失败');
    }
    try {
        const tag = document.createElement('textarea');
        tag.value = value;
        document.body.appendChild(tag);
        tag.select();
        document.execCommand('copy');
        tag.remove();
        return alert('复制成功');
    } catch (err) {
        return alert('复制失败：' + err);
    }
}

/**
 * 异步的 Clipboard API 复制方法
 * @returns 
 */
async function checkClipboardPermission() {
    try {
        const status = await navigator.permissions.query({ name: 'clipboard-write' });
        if (status.state === 'granted') {
            return true; // 用户已授予权限
        } else if (status.state === 'prompt') {
            // 用户尚未做出选择，可以尝试请求权限
            const granted = await navigator.permissions.request({ name: 'clipboard-write' });
            return granted.state === 'granted';
        } else {
            // 用户已拒绝权限
            return false;
        }
    } catch (err) {
        console.error('检查剪贴板权限时出错:', err);
        return false;
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
async function asyncClipboardCopy(value) {
    if (await checkClipboardPermission()) {
        try {
            await navigator.clipboard.writeText(value);
            return alert('复制成功');
        } catch (err) {
            return alert('复制失败：' + err);
        }
    } else {
        return alert('当前浏览器不支持这个 Clipboard API 或用户未授予剪贴板写入权限');
    }
}

// copy事件和paste事件
export function copy(value) {
    if (navigator.clipboard) {
        return asyncClipboardCopy(value);
    } else {
        return execCommandCopy(value);
    }
}

