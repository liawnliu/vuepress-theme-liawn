<script>
/**
 * RightSidebarContent使用了functional: true，将其定义为函数式组件，它只是一个函数，渲染开销会低很多。
 * 它无状态（没有响应式数据），也没有实例（没有this上下文）
 */
export default {
  name: "RightSidebarContent",
  functional: true,
  props: {
    tree: {
      type: Array,
      default: () => [],
    },
  },
  // 为了弥补缺少的实例，提供第二个参数作为上下文
  render(h, context) {
    // 上面props里的headers
    const { tree } = context.props;
    // 处理tree，对每一项都生成对应的<a>并用<li>包裹，如果children有内容，那么嵌套生成新的ul-li
    const handleList = (data) => {
      // 返回的数组每项都是li
      return data.map((item) => {
        const { title, slug, children } = item;
        const aTag = (
          <a href={slug ? `#${slug}` : ""} title={title}>
            {title}
          </a>
        );
        if (children) {
          // 嵌套一层ul-li
          const child = <ul>{handleList(children)}</ul>;
          return (
            <li>
              {aTag}
              {child}
            </li>
          );
        }
        return <li>{aTag}</li>;
      });
    };
    // 直接返回jsx也可以，它会由vue编译成虚拟dom。用ul包裹li数组。
    return (
      <ul>
        <h4>本文目录</h4>
        {handleList(tree)}
      </ul>
    );
  },
};
</script>
