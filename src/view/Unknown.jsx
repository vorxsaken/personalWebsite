import React, { useEffect } from 'react'

function Unknown() {
  useEffect(() => {
    return () => {
      document.documentElement.scrollTop = 0;
    }
  }, [])
  return (
    <div className='w-full h-auto min-h-screen flex items-center justify-center'>
        <span className='text-2xl font-bold text-slate-300'>Unknown Page</span>
    </div>
  )
}

export default Unknown