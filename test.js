// 事件发布订阅模式
class EventEmitter {
    constructor() {
        this.handler = {};
    }

    // 是否只执行触发一次
    // 事件注册
    sumbit (type, handler, once = false) {
        if (!this.handler[type]) {
            this.handler[type] = [];
        }
        // 不重复注册
        if (!this.handler[type].includes(handler)) {
            this.handler[type].push(handler);
            handler.once = once;
        }
    }

    remove (type, handler) {
        if (this.handler[type]?.includes(handler)) {
            this.handler[type] = this.handler[type].filter((item) => item !== handler);
        }
    }

    once (type, handler) {
        this.sumbit(type, handler, true);
    }

    trigger (type) {
        if (!this.handler[type]) return;

        this.handler[type].forEach((item) => {
            item.call(this);

            if (item.once) {
                this.remove(type, item);
            }
        })
    }
}