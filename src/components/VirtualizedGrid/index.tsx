import { FC, useEffect, useRef, useState, ChangeEvent } from 'react';
import { useInfiniteQuery } from 'react-query'
import axios from 'axios';
import {
  AutoSizerProps,
  Grid as _Grid,
  GridProps,
  WindowScroller as _WindowScroller,
  AutoSizer as _AutoSizer,
  WindowScrollerProps,
} from 'react-virtualized';

import 'react-virtualized/styles.css';

import { useWindowSize } from '../../hooks/useWindowResize';

import Card from '../Card';
import CardSkeleton from '../Card/skeleton';
import Search from '../Search';
import NoResults from '../NoResults';

const Grid = (_Grid as unknown) as FC<GridProps>;
const WindowScroller = (_WindowScroller as unknown) as FC<WindowScrollerProps>;
const AutoSizer = (_AutoSizer as unknown) as FC<AutoSizerProps>;

interface VirtualizedGridProps {
  itemMinWidth: number;
  numColumns?: number;
}

const LIMIT_CARDS = 20;
const INITIAL_COLUMNS = 4;

const fetchCards = async (offset: number) => {
  const { data } = await axios.get(
    `https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=${LIMIT_CARDS}&offset=${offset}`
  );

  return {
    results: data?.results ?? [],
    offset,
  };
};

export default function VirtualizedGrid({
  itemMinWidth,
  numColumns
}: VirtualizedGridProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('')
  const gridRef = useRef<any>(null);
  const containerRef = useRef<any>(null);
  const containerWidth = containerRef?.current?.clientWidth;
  const columnCount = calculateColumnCount(containerWidth) ?? INITIAL_COLUMNS

  const windowSize = useWindowSize();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(['nfts'], ({ pageParam = 0 }) => fetchCards(pageParam), {
      getNextPageParam: (lastPage) => {
        const hasNextPage = lastPage.results.length === LIMIT_CARDS || lastPage.results.length === LIMIT_CARDS - 1
        const nextPage = hasNextPage ? lastPage.offset + LIMIT_CARDS : undefined;
        return nextPage;
      },
    });

  const items = data
    ? data?.pages.flatMap(item => item.results).filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    : []

  const cardRenderer = ({ columnIndex, key, rowIndex, style }: any) => {
    const itemIndex = rowIndex * columnCount + columnIndex;
    const item = items[itemIndex] ?? null;

    return (
      <div key={key} style={{ ...style }} className="card">
        {item && (<Card img={item?.img} title={item.title} price={item?.price} />)}
      </div>
    );
  };

  const skeletonRender = ({ key, style }: any) => {
    return (
      <div key={key} style={{ ...style }} className="card">
        <CardSkeleton />
      </div>
    )
  }

  function calculateColumnCount(width: number) {
    return Math.floor(width / itemMinWidth);
  }

  function calculateItemWidth(width: number, columnCount: number) {
    return width / columnCount;
  }

  function calculateCardHeight () {
    if (columnCount === 1) {
      return 670
    } else if (columnCount === 2) {
      return 470
    } else if (columnCount === 3) {
      return 430
    } else {
      return 390
    }
  };

  function onChangeSearch (event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    gridRef.current?.recomputeGridSize();
  }, [windowSize]);

  return (
    <>
      <Search
        label='Search NFT'
        value={searchValue}
        onChange={onChangeSearch}
      />
      <div ref={containerRef} className='grid-container'>
        {
          isFetchingNextPage && !isFetching ? <CardSkeleton /> : !isFetching && !items.length ? (
            <NoResults />
          ) : (
            <WindowScroller>
              {({ height, isScrolling, scrollTop }) => (
                <AutoSizer disableHeight>
                {() => {
                  const columns =
                    numColumns ?? calculateColumnCount(containerWidth);
                  const rowCount = Math.ceil(items.length / columns);
                  const itemWidth = calculateItemWidth(containerWidth, columns);

                  return (
                    <Grid
                      ref={(grid: any) => {
                        gridRef.current = grid
                      }}
                      autoHeight
                      columnCount={columnCount}
                      columnWidth={itemWidth}
                      width={containerWidth || 0}
                      height={height}
                      rowCount={rowCount}
                      rowHeight={calculateCardHeight()}
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                      onScroll={({ clientHeight, scrollHeight, scrollTop }) => {

                        const scrollTopRef = scrollTop * 2

                        if (hasNextPage && !isFetchingNextPage && scrollHeight - scrollTopRef - clientHeight < 500) {
                          fetchNextPage();
                        }
                      }}
                      cellRenderer={isFetchingNextPage ? skeletonRender : cardRenderer}
                    />
                  );
                }}
              </AutoSizer>
              )}
            </WindowScroller>
          )
        }
      </div>
    </>
  );
}
