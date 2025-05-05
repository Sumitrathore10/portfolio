import React from 'react'
import Nav from './components/nav.jsx'
import Hero from './components/Hero.jsx'

const App = () => {
  return (
    <div className='w-full  overflow-y-scroll flex-col justify-center flex h-screen'>
      <Nav />
      <Hero />
    </div>
  )
}

export default App