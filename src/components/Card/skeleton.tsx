import { FunctionComponent } from 'react'

const CardSkeleton: FunctionComponent = (): JSX.Element => {
  return (
    <>
      {
        new Array(20).fill(0).map((_, index) => {
          return (
            <div className='w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4' key={`card-skeleton-${index}`}>
              <div className="rounded-lg h-[574px] sm:h-[304px] md:h-[496px] lg:h-[368px] xl:h-[280px] bg-gray-400 w-full object-cover object-center"></div>
              <div className="px-6 py-4">
                <div className='w-full bg-gray-400 animate-pulse h-4 mb-2'></div>
                <div className='w-1/4 bg-gray-400 animate-pulse h-4 mb-2'></div>
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default CardSkeleton

