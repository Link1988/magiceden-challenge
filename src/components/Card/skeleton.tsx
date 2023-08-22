import { FunctionComponent } from 'react'

type SkeletonProps = {
  isFirstLoad?: boolean
}

const CardSkeleton: FunctionComponent<SkeletonProps> = ({ isFirstLoad }): JSX.Element => {
  return (
    <div className={`${isFirstLoad ? 'flex flex-wrap' : ''}`}>
      {
        new Array(20).fill(0).map((_, index) => {
          return (
            <div className={`w-full ${isFirstLoad ? 'sm:w-1/2 md:w-1/2 xl:w-1/4 p-4' : ''}`} key={`card-skeleton-${index}`}>
              <div className="rounded-lg h-[384px] sm:h-[384px] md:h-[386px] lg:h-[348px] xl:h-[300px] bg-gray-400 w-full object-cover object-center"></div>
              <div className="px-6 py-4">
                <div className='w-full bg-gray-400 animate-pulse h-4 mb-2'></div>
                <div className='w-1/4 bg-gray-400 animate-pulse h-4 mb-2'></div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default CardSkeleton