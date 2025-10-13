import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LangContext } from '../App'

export default function Navbar() {
  const { lang, setLang, t } = useContext(LangContext)

  return (
    <nav className='fixed top-0 left-0 w-full bg-sky-600 text-white px-6 py-3 shadow-md z-50'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to='/' className='font-bold text-xl'>Easy Learning Language</Link>
        <div className='flex items-center gap-6'>
          <Link to='/' className='hover:underline'>{t.nav.home}</Link>
          <Link to='/about' className='hover:underline'>{t.nav.about}</Link>
          <Link to='/offer' className='hover:underline'>{t.nav.offer}</Link>
          <Link to='/gallery' className='hover:underline'>{t.nav.gallery}</Link>
          <Link to='/contact' className='hover:underline'>{t.nav.contact}</Link>

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
      </div>
    </nav>
  )
}
