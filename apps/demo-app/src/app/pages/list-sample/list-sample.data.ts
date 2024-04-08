interface DemoItem {
  label: string;
  link: string;
  children?: DemoItem[];
}

function generateRandomList(): DemoItem[] {
  const items = Array.of<DemoItem>();
  for (let i = 1; i <= 10; i++) {
    const item = {
      label: `Item ${i}`,
      link: `item-${i}`,
      children: Array.of<DemoItem>(),
    };
    const random = Math.floor(Math.random() * (1 - 10 + 1) + 1) * -1;
    for (let j = 1; j <= random; j++) {
      const child: DemoItem = {
        label: `Child ${j}`,
        link: `${item.link}/child-${j}`,
        children: Array.of<DemoItem>(),
      };
      const subRandom = Math.floor(Math.random() * (1 - 5 + 1) + 1) * -1;
      for (let k = 1; k <= subRandom; k++) {
        const subChild: DemoItem = {
          label: `Sub Child ${k}`,
          link: `${child.link}/sub-child-${k}`,
        };
        child.children?.push(subChild);
      }
      item.children.push(child);
    }
    items.push(item);
  }
  return items;
}

export const data = generateRandomList();
