import { FC } from 'react';
import { UniformSlot, useUniformCurrentComposition } from '@uniformdev/canvas-react';
import { AccordionProps } from '.';
import { ComponentInstance, isComponentPlaceholderId } from '@uniformdev/canvas';

const isSlotEmpty = (components: Pick<ComponentInstance, '_id'>[] | undefined) => {
  if (components && components.length > 0) {
    const [firstComponent] = components;
    return isComponentPlaceholderId(firstComponent._id);
  }

  // Handle the case where the array is undefined or empty
  return true;
};
export const Accordion: FC<AccordionProps> = ({ component }) => {
  // const wrapperComponent = ({ items }: UniformSlotWrapperComponentProps) => {
  //   // const reducedResult = items?.reduce<ReactNode[][]>((acc, item) => {
  //   //   console.log('item', item);
  //   //   acc.push(item);
  //   //   return acc;
  //   // }, []);

  //   return (
  //     <>
  //       <hr />
  //       <p>Custom wrapper</p>
  //       {items}
  //       <hr />
  //     </>
  //   );
  // };
  const { isContextualEditing } = useUniformCurrentComposition();
  console.log('content data', component?.slots?.content);
  console.log('isContextualEditing', isContextualEditing);
  return (
    <>
      <p>Are we editing? {isContextualEditing ? 'Yes' : 'No'}</p>
      {!isSlotEmpty(component?.slots?.items) ? (
        <>
          <UniformSlot name="items" />
        </>
      ) : (
        <>
          <h3>No items in items slot</h3>
        </>
      )}
      {!isSlotEmpty(component?.slots?.image) ? (
        <>
          <UniformSlot name="image" />
        </>
      ) : (
        <>
          <h3>No items in image slot</h3>
        </>
      )}
      {component?.slots?.content?.length ? (
        <>
          <UniformSlot name="content" />
        </>
      ) : (
        <>
          <h3>No items in content slot</h3>
        </>
      )}
    </>
  );
};
