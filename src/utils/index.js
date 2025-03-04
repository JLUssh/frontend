//节流函数

// 频繁调用的事件，在单位时间内，只调用一次
export function throttle (handler, time) {
    let timer = null;
    return (...args) => {
        if (!timer) {
            timer = setTimeout(() => {
                handler.apply(this, args);
                timer = null;
            }, time);
        }
    };
}

// 频繁调用的事件，在单位时间内，只调用最后一次
export function debounce (handler, time) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            handler.apply(this, args);
            timer = null;
        }, time);
    };
}

//将A的内容混入到B中
export function Mixin (A, B) {
    // let newA = structuredClone(A);
    return Object.assign(A, B);
}