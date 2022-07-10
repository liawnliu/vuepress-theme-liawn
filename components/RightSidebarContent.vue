<script>
/**
 * RightSidebarContent使用了functional: true，将其定义为函数式组件，它只是一个函数，渲染开销会低很多。
 * 它无状态（没有响应式数据），也没有实例（没有this上下文）
 */
export default {
  name: "RightSidebarContent",
  functional: true,
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
  },
  // 为了弥补缺少的实例，提供第二个参数作为上下文
  render(createElement, context) {
    // 上面props里的headers
    const { headers } = context.props;
    if (!headers || !headers.length) return <div />;
    const createHeaderEl = (level, vnode) => {
      return createElement(`h${level}`, [vnode]);
    };
    const headerEls = headers.map((item) => {
      return createHeaderEl(
        item.level,
        <RouterLink to={`#${item.slug}`} title={item.title}>
          {item.title}
        </RouterLink>
      );
    });
    // 直接返回jsx也可以，它会由vue编译成虚拟dom。用ul包裹li数组。
    return (
      <div>
        <div class="title">本文目录</div>
        {headerEls}
      </div>
    );
  },
};
</script>
