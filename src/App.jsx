import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Offer from './pages/Offer'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import Application from './pages/Application'
import en from './locales/en.json'
import pl from './locales/pl.json'
import Signup from './pages/Signup'

export const LangContext = React.createContext()

export default function App() {
  const [lang, setLang] = useState('pl') // default to PL; change as needed
  const t = lang === 'en' ? en : pl

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <Router>
        <div className='min-h-screen flex flex-col'>
          <Navbar />
          <main className='flex-1'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/about' element={<About />} />
              <Route path='/offer' element={<Offer />} />
              <Route path='/gallery' element={<Gallery />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/application' element={<Application />} />

            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LangContext.Provider>
  )
}
