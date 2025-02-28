import React from 'react'
import { Header } from '../_components/Header'
import Footer from '../_components/Footer'


function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-800">
     <header>
      <Header/>
     </header>
      <main className="container mx-auto px-4"> 
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default MainLayout