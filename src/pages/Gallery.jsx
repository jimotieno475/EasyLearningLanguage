import React, { useContext, useState } from 'react'
import { LangContext } from '../App'
import { images, Videos } from '../assets'

export default function Gallery() {
  const { t } = useContext(LangContext)
  const [activeTab, setActiveTab] = useState('photos') // 'photos' | 'videos'
  const [activeVideo, setActiveVideo] = useState(null) // for enlarged view

  const imageList = Object.entries(images)
  const videoList = Object.entries(Videos)

  return (
    <section className='max-w-7xl mx-auto py-16 px-4'>
      {/* ====== HEADER ====== */}
      <h2 className='text-3xl font-bold text-sky-700 mb-4 text-center'>
        {t.gallery.title}
      </h2>
      <p className='text-gray-700 mb-8 text-center'>{t.gallery.text}</p>

      {/* ====== PREVIEW SECTION ====== */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
        {/* first 4 images */}
        {imageList.slice(0, 4).map(([name, src], i) => (
          <div key={i} className='relative group'>
            <img
              src={src}
              alt={name}
              className='w-full h-36 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105'
            />
          </div>
        ))}

        {/* first video */}
        {videoList.slice(0, 1).map(([name, src], i) => (
          <div
            key={i}
            className='relative group cursor-pointer col-span-2 md:col-span-1'
            onClick={() => setActiveVideo(src)}
          >
            <video
              src={src}
              controls
              controlsList='nodownload'
              className='w-full h-36 object-cover rounded-xl shadow-md'
            />
          </div>
        ))}
      </div>

      {/* ====== TAB SWITCHER ====== */}
      <div className='flex justify-center mb-8'>
        <div className='bg-gray-100 rounded-full p-1 flex gap-1'>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === 'photos'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.gallery.b1 || 'Photos'}
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === 'videos'
                ? 'bg-rose-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            {t.gallery.b2 || 'Videos'}
          </button>
        </div>
      </div>

      {/* ====== TAB CONTENT ====== */}
      <div className='transition-all duration-500 ease-in-out'>
        {activeTab === 'photos' ? (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {imageList.map(([name, src], i) => (
              <div key={i} className='relative group'>
                <img
                  src={src}
                  alt={name}
                  className='w-full h-40 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105'
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {videoList.map(([name, src], i) => (
              <div
                key={i}
                className='relative group cursor-pointer'
                onClick={() => setActiveVideo(src)}
              >
                <video
                  src={src}
                  controls
                  controlsList='nodownload'
                  className='w-full h-64 object-cover rounded-xl shadow-md'
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ====== VIDEO MODAL ====== */}
      {activeVideo && (
        <div
          className='fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4'
          onClick={() => setActiveVideo(null)}
        >
          <div
            className='relative w-full max-w-4xl'
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideo}
              autoPlay
              controls
              controlsList='nodownload'
              className='w-full h-auto rounded-xl shadow-2xl'
            />
            <button
              onClick={() => setActiveVideo(null)}
              className='absolute top-2 right-2 bg-black/70 text-white rounded-full px-3 py-1 text-sm hover:bg-black/90'
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
