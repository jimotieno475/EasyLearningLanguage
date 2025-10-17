import React, { useContext } from 'react'
import { LangContext } from '../App'

export default function Footer() {
  const { t } = useContext(LangContext)
  return (
    <footer className='bg-gray-100 text-gray-700 py-6 mt-8'>
      {/* Google Map Section */}
<section className="relative w-full h-80 md:h-96">
  <a
    href="https://www.google.com/maps/dir/?api=1&destination=Poznańska+117,+62-023+Kamionki,+Poland"
    target="_blank"
    rel="noopener noreferrer"
    className="block w-full h-full"
  >
    <iframe
      title="Easy Learning Language Location"
      src="https://www.google.com/maps?q=Poznańska+117,+62-023+Kamionki,+Poland&output=embed"
      width="100%"
      height="100%"
      allowFullScreen=""
      loading="lazy"
      className="rounded-none border-t-4 border-sky-600"
    ></iframe>

    {/* Hover overlay for clarity */}
    <div className="absolute inset-0 bg-transparent hover:bg-black/20 transition duration-300 flex items-center justify-center text-white font-medium text-lg opacity-0 hover:opacity-100">
      View on Google Maps →
    </div>
  </a>
</section>


      <div className='container mx-auto text-center text-sm'>
        <div>{t.contact.address} • {t.contact.phone} • {t.contact.email}</div>
        <div className='mt-2'>&copy; {new Date().getFullYear()} Easy Learning Language</div>
      </div>
    </footer>
  )
}
