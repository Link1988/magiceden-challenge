import { FC, useEffect, useRef } from 'react';
import {
  AutoSizerProps,
  Grid as _Grid,
  GridCellProps,
  GridProps,
  WindowScroller as _WindowScroller,
  AutoSizer as _AutoSizer,
  WindowScrollerProps,
  CellMeasurer,
  CellMeasurerCache,
  ColumnSizer
} from 'react-virtualized';
import { VirtualizedGridItemProps } from '../../interfaces';

import { useWindowSize } from '../../hooks/useWindowResize';

const Grid = (_Grid as unknown) as FC<GridProps>;
const WindowScroller = (_WindowScroller as unknown) as FC<WindowScrollerProps>;
const AutoSizer = (_AutoSizer as unknown) as FC<AutoSizerProps>;

interface VirtualizedGridProps<ItemType> {
  items: ItemType[];
  itemHeight: number;
  itemMinWidth: number;
  renderItem: (props: VirtualizedGridItemProps<ItemType>) => JSX.Element;
  numColumns?: number;
}


export function VirtualizedGrid<ItemType>({
  items,
  renderItem,
  itemHeight,
  itemMinWidth,
  numColumns
}: VirtualizedGridProps<ItemType>): JSX.Element {
  const gridRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const containerWidth = containerRef?.current?.clientWidth;

  const windowSize = useWindowSize();

  useEffect(() => {
    gridRef.current?.recomputeGridSize();
  }, [windowSize]);

  function calculateColumnCount(width: number) {
    return Math.floor(width / itemMinWidth);
  }

  function calculateItemWidth(width: number, columnCount: number) {
    return width / columnCount;
  }

  return (
    <div ref={containerRef} className='grid-container'>
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <AutoSizer disableHeight>
            {() => {
              const columnCount =
                numColumns ?? calculateColumnCount(containerWidth);
              const rowCount = Math.ceil(items.length / columnCount);
              const itemWidth = calculateItemWidth(containerWidth, columnCount);

              return (
                <Grid
                  ref={gridRef}
                  autoHeight
                  columnCount={columnCount}
                  columnWidth={itemWidth}
                  width={containerWidth}
                  height={height}
                  rowCount={rowCount}
                  rowHeight={itemHeight}
                  isScrolling={isScrolling}
                  scrollTop={scrollTop}
                  onScroll={onChildScroll}
                  cellRenderer={(props: GridCellProps) => {
                    const fullProps: VirtualizedGridItemProps<ItemType> = {
                      ...props,
                      items,
                      columnCount: columnCount
                    };
                    return renderItem(fullProps);
                  }}
                />
              );
            }}
          </AutoSizer>
        )}
      </WindowScroller>
    </div>
  );
}
