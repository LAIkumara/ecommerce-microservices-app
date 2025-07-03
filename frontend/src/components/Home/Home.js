import React from 'react'

function Home() {
  return (
    <div>
      <button onClick={()=> window.location.href = '/additem'}>
        Add Item </button>
    </div>
  )
}

export default Home