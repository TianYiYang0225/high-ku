```javascript
// 阻力，数值越大，滑动越慢
const drag = 10;
const location = 0;
// 滑动到顶部
const scrollToTop = () => {
  // 距离顶部的距离
  const gap = document.documentElement.scrollTop || document.body.scrollTop;
  if (gap > location) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, gap - gap / drag);
  }
};
scrollToTop();
```
