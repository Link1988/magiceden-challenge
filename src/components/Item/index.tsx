import { VirtualizedGridItemProps } from "../../interfaces";

interface TestObject {
  title?: string;
  price?: string;
  img?: string;
}

export interface TestGridItemProps
  extends VirtualizedGridItemProps<TestObject> {}

export function Item({
  items,
  columnCount,
  rowIndex,
  columnIndex,
  style
}: TestGridItemProps): JSX.Element {
  const index = rowIndex * columnCount + columnIndex;

  if (index > items.length - 1) {
    return <></>;
  }

  const card = (
    <>
      <img
        className="w-full"
        src={items[index].img}
        alt=""
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{items[index]?.title}</div>
        <p className="text-gray-700 text-base">${items[index]?.price}</p>
      </div>
    </>
  );

  return (
    <div className='w-full'>
      <div className="block bg-white shadow-md hover:shadow-xl rounded-lg" style={style}>
        {card}
      </div>
    </div>
  );
}
