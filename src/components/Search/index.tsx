import React, { ChangeEvent, FunctionComponent } from 'react'

export interface SearchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  value?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Search: FunctionComponent<SearchProps> = ({
  label,
  value,
  onChange,
  ...restProps
}): JSX.Element => {
  return (
    <div className='mb-4' data-te-input-wrapper-init>
      <input
        type='text'
        value={value}
        onChange={onChange}
        placeholder={label}
        {...restProps}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  )
}

export default Search
