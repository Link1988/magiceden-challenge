import { GridCellProps } from 'react-virtualized';

export interface VirtualizedGridItemProps<ItemType> extends GridCellProps {
  items: ItemType[];
  columnCount: number;
}
