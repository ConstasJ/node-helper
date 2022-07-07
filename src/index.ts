(function () {
    const proto = Promise.prototype;
    Reflect.defineProperty(proto, 'done', {
        value: function (onFullfilled: () => any, onRejected: () => never) {
            this.then(onFullfilled(), onRejected()).catch(function (reason: never) {
                setTimeout(() => {
                    throw reason;
                }, 0);
            });
        }
    });
    Reflect.defineProperty(proto, 'finally', {
        value: function (callback: () => never) {
            const P = this.constructor;
            return this.then(
                (value: never) => P.resolve(callback()).then(() => value),
                (reason: never) =>
                    P.resolve(callback()).then(() => {
                        throw reason;
                    })
            );
        }
    });
})();

function promiseDone(obj: Promise<never>, onFullfilled: () => never, onRejected: () => never) {
    obj.then(onFullfilled, onRejected).catch(function (reason) {
        setTimeout(() => {
            throw reason;
        }, 0);
    });
}

function promiseFinally(obj: Promise<never>, fn: () => never) {
    return obj.then(
        (value) => Promise.resolve(fn()).then(() => value),
        (reason) =>
            Promise.resolve(fn()).then(() => {
                throw reason;
            })
    );
}

export default {
    promiseDone,
    promiseFinally
};
