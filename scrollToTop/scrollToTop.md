```javascript
// 阻力，数值越大，滑动越慢
const drag = 10;
// 滑动到顶部
const scrollToTop = () => {
  // 距离顶部的距离
  const gap = document.documentElement.scrollTop || document.body.scrollTop;
  if (gap > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, gap - gap / drag);
  }
};
scrollToTop();
```
