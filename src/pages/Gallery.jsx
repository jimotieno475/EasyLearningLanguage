import React, { useContext } from 'react'
import { LangContext } from '../App'
import images from '../assets' // adjust this path based on where your assets/index.js is

export default function Gallery() {
  const { t } = useContext(LangContext)

  return (
    <section className='max-w-5xl mx-auto py-16 px-4'>
      <h2 className='text-3xl font-bold text-sky-700 mb-4'>
        {t.gallery.title}
      </h2>
      <p className='text-gray-700 mb-6'>{t.gallery.text}</p>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        {Object.entries(images).map(([name, src], i) => (
          <div key={i} className='relative group'>
            <img
              src={src}
              alt={name}
              className='w-full h-32 object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105'
            />
            <span className='absolute bottom-1 left-1 bg-black/50 text-white text-xs px-2 py-1 rounded'>
              {/* {name} */}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
