# node-helper

Some useful functions for Node.js development.

## Functions

### deduplicate(arr)

deduplicate the array.

```typescript
import { deduplicate } from '@constasj/helper';

const arr = [1, 2, 2];
const darr = deduplicate(arr);

darr; // [1,2]
```

You can also use it like that:

```typescript
import '@constasj/helper';

const arr = [1, 2, 2];
const darr = arr.deduplicate();

darr; // [1,2]
```

### enumToArray(enum)

change an enum to an array.

```typescript
import { enumToArray } from '@constasj/helper';

enum Example {
    CORAS,
    BEDIS,
    NEGA
}

const arr = enumToArray(Example);

arr; // ["CORAS","BEDIS","NEGA"]
```

### done(onFullfilled,onRejected)

Add done() for Promise chain.

```typescript
import { promise } from '@constasj/helper';

const pro = Promise.resolve(1);
promise.done(
    pro,
    (value) => value,
    (reason) => {
        throw reason;
    }
);
```

You can also use it like that:

```typescript
import '@constasj/helper';

const pro = Promise.resolve(1).done(
    (value) => value,
    (reason) => {
        throw reason;
    }
);
```
