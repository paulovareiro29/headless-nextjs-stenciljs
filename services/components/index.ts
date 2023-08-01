export const convertBlocksToComponents = (blocks: Array<any>): any => {
  return blocks.map((block) => {
    const { id, __component, blocks, ...props } = block;
    const componentName = __component.split(".").pop();

    const component: any = {
      id,
      component: componentName,
      props,
    };

    if (blocks) {
      component.blocks = convertBlocksToComponents(blocks);
    }

    return component;
  });
};
