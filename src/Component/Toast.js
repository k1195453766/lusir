import Toast from 'react-native-root-toast';

/**
 * 在外部页面引入ToastShort，toastShort，toastLong时，要用 {}包裹
 */

/**
    * 冒一个时间比较短的Toast
    * @param content
    */
export const toastShort = (content) => {
    let toast;
    if (toast !== undefined) {
        Toast.hide(toast);
    }
    toast = Toast.show(content.toString(), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    });
};

export const toastLong = (content) => {
    let toast;
    if (toast !== undefined) {
        Toast.hide(toast);
    }
    toast = Toast.show(content.toString(), {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    });
};

export const ToastShort = (content) => {
    if (content.length == 0) {
        return;
    }
    Toast.show(content.toString(), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    })
}

export const ToastShortBottom = (content) => {
    if (content.length == 0) {
        return;
    }
    Toast.show(content.toString(), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    })
}

