import React from 'react'
import { useSelector } from 'react-redux'

const Dark = ({children}) => {
    const theme=useSelector((state)=>state.apptheme.theme);
  return (
    <div className={theme}>
        <div className="bg-zinc-100 text-black dark:bg-gray-500 ">{children}</div>
    </div>
  )
}

export default Dark