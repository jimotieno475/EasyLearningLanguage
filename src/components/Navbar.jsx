import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LangContext } from '../App'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const { lang, setLang, t } = useContext(LangContext)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className='fixed top-0 left-0 w-full bg-sky-600 text-white shadow-md z-50'>
      <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
        {/* Logo + (mobile language selector) */}
        <div className='flex items-center gap-3'>
          <Link
            to='/'
            onClick={closeMenu}
            className='font-bold text-lg sm:text-xl whitespace-nowrap'
          >
            Easy Learning Language
          </Link>

          {/* Language selector visible only on mobile */}
          <div className='md:hidden'>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className='bg-sky-500 text-white border rounded px-2 py-1 focus:outline-none text-sm'
              aria-label='Select language'
            >
              <option value='en'>EN</option>
              <option value='pl'>PL</option>
            </select>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className='hidden md:flex items-center gap-6'>
          <Link to='/' className='hover:underline'>{t.nav.home}</Link>
          <Link to='/about' className='hover:underline'>{t.nav.about}</Link>
          <Link to='/offer' className='hover:underline'>{t.nav.offer}</Link>
          <Link to='/gallery' className='hover:underline'>{t.nav.gallery}</Link>
          <Link to='/contact' className='hover:underline'>{t.nav.contact}</Link>

          {/* Language selector visible only on desktop */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className='bg-sky-500 text-white border rounded px-2 py-1 focus:outline-none'
            aria-label='Select language'
          >
            <option value='en'>EN</option>
            <option value='pl'>PL</option>
          </select>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-white'
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className='md:hidden bg-sky-700 border-t border-sky-500'>
          <div className='flex flex-col items-start px-6 py-4 gap-3'>
            <Link to='/' onClick={closeMenu} className='w-full hover:underline'>
              {t.nav.home}
            </Link>
            <Link to='/about' onClick={closeMenu} className='w-full hover:underline'>
              {t.nav.about}
            </Link>
            <Link to='/offer' onClick={closeMenu} className='w-full hover:underline'>
              {t.nav.offer}
            </Link>
            <Link to='/gallery' onClick={closeMenu} className='w-full hover:underline'>
              {t.nav.gallery}
            </Link>
            <Link to='/contact' onClick={closeMenu} className='w-full hover:underline'>
              {t.nav.contact}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
