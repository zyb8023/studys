### 盒模型
> 盒模型是由内容(content)、内边距(padding)、外边距(margin)、边框(border)组成。

模型|宽高|设置
:--:|:--:|:--:|
标准模型|content|box-sizing: content-box
怪异模型|content+border+padding|box-sizing: border-box

#### 常见问题
 - 上下的两个元素之间的margin值会重叠显示；谁的值大 就以谁的margin值来显示。 外层元素bfc解决
 - 当父元素里的第一个子元素（块元素），添加margin-top的时候，会错误的把margin-top值添加给父元素 (建立在当前的元素们 没有添加边框和浮动的前提下)
    解决方法： bfc 给父元素添加overflow：hidden； 推荐使用。
    给父元素和子元素添加浮动属性。
    可以给父元素添加边框。
    把margin改成padding。