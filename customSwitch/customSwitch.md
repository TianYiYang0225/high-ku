```html
<input id="customSwitch" type="checkbox" />
<label for="customSwitch" class="switch"></label>
```

```css
/* 定义全局变量 */
:root {
  --base_color: rgba(0, 0, 0, 0.25);
  --act_color: #5dcb61;
}
/* 隐藏input输入框 */
#customSwitch {
  position: absolute;
  left: -9999px;
}
/* 设置自定义颜色 */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: var(--base_color);
  border-radius: 20px;
  transition: all 0.3s 0s;
}
/* 开关圆球 */
.switch::after {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: white;
  transition: all 0.3s 0s;
}

input[type="checkbox"]:checked + .switch::after {
  transform: translateX(20px);
}

input[type="checkbox"]:checked + .switch {
  background-color: var(--act_color);
}
```
