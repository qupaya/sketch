interface DemoItem {
  label: string;
  link: string;
  children?: DemoItem[];
}

function generateRandomList(): DemoItem[] {
  const items = Array.of<DemoItem>();
  for (let i = 1; i <= 10; i++) {
    const item = {
      label: `${SAMPLE_DATA_ITEM_PREFIX} ${i}`,
      link: crypto.randomUUID(),
      children: Array.of<DemoItem>(),
    };
    for (let j = 1; j <= 5; j++) {
      const child: DemoItem = {
        label: `${SAMPLE_DATA_ITEM_PREFIX} child ${j}`,
        link: `${item.link}/${crypto.randomUUID()}`,
        children: Array.of<DemoItem>(),
      };
      for (let k = 1; k <= 3; k++) {
        const subChild: DemoItem = {
          label: `${SAMPLE_DATA_ITEM_PREFIX} grand child ${k}`,
          link: `${child.link}/${crypto.randomUUID()}`,
        };
        child.children?.push(subChild);
      }
      item.children.push(child);
    }
    items.push(item);
  }
  return items;
}

export const SAMPLE_DATA_ITEM_PREFIX = 'Item';
export const SAMPLE_DATA = generateRandomList();
