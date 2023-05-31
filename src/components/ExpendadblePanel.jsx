import { useState } from 'react'
import { GoChevronUp, GoChevronDown } from 'react-icons/go'

export default function ExpendadblePanel({ header, children }) {
  const [expended, setExpended] = useState(false)

  const handleExpend = () => {
    setExpended(!expended)
  }

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between item-center">
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>
        <div onClick={handleExpend} className='flex flex-row items-center justify-center hover:cursor-pointer text-2xl'>
          {expended ? <GoChevronUp /> : <GoChevronDown />}
        </div>
      </div>
      {expended && <div className="p-2 border-t">{children}</div>}
    </div>
  )
}
