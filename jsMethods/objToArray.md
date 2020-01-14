```javascript
const objectToPairs = obj => Object.keys(obj).map(k => [k, obj[k]]);

// [ ['a', 1], ['b', 2] ]
objectToPairs({ a: 1, b: 2 });
```
