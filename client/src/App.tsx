import { Suspense } from 'react'
import './App.css'
import Header from './components/shared/Header'
import SideBar from './components/shared/SideBar'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <div className='flex w-full'>
      <SideBar />
      <div className='flex-auto ' >

        <Header />
        <Suspense>
          <Outlet />
        </Suspense>
      </div>

    </div>
  )
}

export default App
