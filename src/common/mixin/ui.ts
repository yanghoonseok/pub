type ElOrNull = HTMLElement | null;
type NodeOrNull = Node | null;
const uiMixin = {
  methods: {
    getSiblings: function (e: HTMLElement): HTMLElement | Node[] {
      // for collecting siblings
      let siblings: Node[] = [];
      // if no parent, return no sibling
      if (!e.parentNode) {
        return siblings;
      }
      // first child of the parent node
      let sibling: NodeOrNull = e.parentNode!.firstChild;
      // collecting siblings
      while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
          siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
      }
      return siblings;
    },
    getOffsetTop: function (e: ElOrNull): number {
      return (
        e!.getBoundingClientRect().top + document.documentElement.scrollTop
      );
    },
  },
};

export { uiMixin };
