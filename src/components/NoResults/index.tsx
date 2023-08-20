import { FunctionComponent } from 'react'

const NoResults: FunctionComponent = (): JSX.Element => {
  return (
    <div className='flex justify-center w-full'>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">No results found</h2>
    </div>
  )
}

export default NoResults
