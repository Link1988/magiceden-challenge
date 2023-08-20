import { ChangeEvent, useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query'
import { useInView } from "react-intersection-observer";
import axios from 'axios';

import useDebounce from './hooks/useDebounce';

import Search from './components/Search';
import Card from './components/Card';
import CardSkeleton from './components/Card/skeleton';
import NoResults from './components/NoResults';

import './App.css';

const LIMIT_CARDS = 20

type CardProps = {
  id: string
  img?: string
  title?: string
  price?: string
}

const fetchCards = async (offset: number) => {
  const { data } = await axios.get(
    `https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=okay_bears&limit=${LIMIT_CARDS}&offset=${offset}`
  );

  return {
    results: data?.results ?? [],
    offset,
  };
};

function App() {
  const { ref, inView } = useInView();

  const [searchValue, setSearchValue] = useState<string>('')
  const [allItems, setAllItems] = useState<any[]>([])
  const [filteredItems, setFilteredItems] = useState<any[]>([])

  const { isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery('nfts', ({ pageParam = 0 }) => fetchCards(pageParam), {
      getNextPageParam: (lastPage) => {
        const hasNextPage = lastPage.results.length === LIMIT_CARDS || lastPage.results.length === LIMIT_CARDS - 1
        const nextPage = hasNextPage ? lastPage.offset + LIMIT_CARDS : undefined;
        return nextPage;
      },
      onSuccess(data) {
        const items = data?.pages.flatMap(item => item.results)
        setAllItems(items)
      },
    });

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  const cards =
    isSuccess && allItems.map((card: CardProps, index: number) => {
      if (allItems.length === index + 1) {
        return (
          <div className='w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4'>
            <Card ref={ref} key={card.id} title={card?.title} price={card?.price} img={card.img} />
          </div>
        )
      }

      return (
        <div className='w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4'>
          <Card key={card.id} title={card?.title} price={card?.price} img={card.img} />
        </div>
      )
    })

  const filteredCards = isSuccess && filteredItems.map((card: CardProps) => {
    return (
      <div className='w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4'>
        <Card key={card.id} title={card?.title} price={card?.price} img={card.img} />
      </div>
    )
  })

  useDebounce(() => {
    if (searchValue === '') {
      setFilteredItems(allItems)
    } else {
      const filteredItems = allItems.filter(({ title }) => title.includes(searchValue));

      setFilteredItems(filteredItems)
    }
  }, [searchValue], 500);

  useEffect(() => {
    if (inView && hasNextPage && searchValue === '') {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, searchValue]);

  return (
    <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
      <div className='container mx-auto'>
        <Search
          label='Search NFT'
          value={searchValue}
          onChange={onChangeSearch}
        />
        <div className="flex flex-wrap -mx-4">
          {!searchValue ? cards : filteredCards}
          {(isFetchingNextPage || isFetching) && <CardSkeleton />}
          {searchValue && !filteredItems.length && <NoResults />}
        </div>
      </div>
    </div>
  );
}

export default App;
