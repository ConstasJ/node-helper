declare global {
    interface Array<T> {
        deduplicate(): T[];
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Promise<T> {
        done(onFullfilled: () => unknown, onRejected: () => unknown): void;
    }
}

(function () {
    Array.prototype.deduplicate = function () {
        const set = new Set(this);
        return Array.from(set);
    };
    Promise.prototype.done = function (onFullfilled: () => unknown, onRejected: () => unknown) {
        this.then(onFullfilled, onRejected).catch(function (reason) {
            setTimeout(() => {
                throw reason;
            }, 0);
        });
    };
})();

function done(obj: Promise<unknown>, onFullfilled: () => unknown, onRejected: () => unknown) {
    obj.then(onFullfilled, onRejected).catch(function (reason) {
        setTimeout(() => {
            throw reason;
        }, 0);
    });
}

function dedumplicate(arr: unknown[]) {
    const set = new Set(arr);
    return Array.from(set);
}

function eToA(emun: Record<string | number, unknown>): unknown[] {
    const arr: unknown[] = [];
    for (const key in emun) {
        arr.push(emun[key]);
    }
    return arr;
}

export default {
    promise: {
        done: done
    },
    deduplicate: dedumplicate,
    enumToArray: eToA
};
