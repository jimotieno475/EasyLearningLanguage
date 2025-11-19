import React, { useContext, useState, useRef, useEffect } from 'react'
import { LangContext } from '../App'
import { images, Videos } from '../assets'

export default function Gallery() {
  const { t } = useContext(LangContext)
  const [activeTab, setActiveTab] = useState('photos') // 'photos' | 'videos'
  const [activeImageIndex, setActiveImageIndex] = useState(null)
  const [activeVideoIndex, setActiveVideoIndex] = useState(null)

  const imageList = Object.entries(images)
  const videoList = Object.entries(Videos)

  // This is now plain JS – no TypeScript syntax
  const videoRefs = useRef([])

  // Pause all videos in the grid
  const pauseAllVideos = () => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause()
        // video.currentTime = 0  // uncomment if you want reset
      }
    })
  }

  // Image navigation
  const nextImage = () => {
    if (activeImageIndex === null) return
    setActiveImageIndex((prev) => (prev + 1) % imageList.length)
  }

  const prevImage = () => {
    if (activeImageIndex === null) return
    setActiveImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length)
  }

  // Video navigation
  const nextVideo = () => {
    if (activeVideoIndex === null) return
    setActiveVideoIndex((prev) => (prev + 1) % videoList.length)
  }

  const prevVideo = () => {
    if (activeVideoIndex === null) return
    setActiveVideoIndex((prev) => (prev - 1 + videoList.length) % videoList.length)
  }

  // Keyboard support
  const handleKeyDown = (e) => {
    if (activeImageIndex !== null) {
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') setActiveImageIndex(null)
    }
    if (activeVideoIndex !== null) {
      if (e.key === 'ArrowRight') nextVideo()
      if (e.key === 'ArrowLeft') prevVideo()
      if (e.key === 'Escape') setActiveVideoIndex(null)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeImageIndex, activeVideoIndex])

  // Auto-pause videos when modal opens or tab changes
  useEffect(() => {
    if (activeVideoIndex !== null || activeTab === 'photos') {
      pauseAllVideos()
    }
  }, [activeVideoIndex, activeTab])

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-sky-700 mb-4 text-center">
        {t.gallery.title}
      </h2>
      <p className="text-gray-700 mb-8 text-center">{t.gallery.text}</p>

      {/* PREVIEW SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {imageList.slice(0, 4).map(([name, src], i) => (
          <div
            key={i}
            className="relative group cursor-pointer overflow-hidden rounded-xl"
            onClick={() => setActiveImageIndex(i)}
          >
            <img
              src={src}
              alt={name}
              className="w-full h-36 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}

        {/* First 4 videos as preview */}
        {videoList.slice(0, 4).map(([name, src], i) => (
          <div
            key={i}
            className="relative group cursor-pointer col-span-2 md:col-span-1 overflow-hidden rounded-xl"
            onClick={() => {
              pauseAllVideos()
              setActiveVideoIndex(i)   // ← use i, not 0
            }}
          >
            <video
              ref={(el) => (videoRefs.current[i] = el)}   // ← restore the ref!
              src={src}
              controls
              muted
              preload="metadata"
              controlsList="nodownload"
              className="w-full h-36 object-cover rounded-xl shadow-md"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
              <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        ))}</div>

      {/* TAB SWITCHER */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-1 flex gap-1">
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

      {/* TAB CONTENT */}
      <div className="transition-all duration-500 ease-in-out">
        {activeTab === 'photos' ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {imageList.map(([name, src], i) => (
              <div
                key={i}
                className="relative group cursor-pointer overflow-hidden rounded-xl"
                onClick={() => setActiveImageIndex(i)}
              >
                <img
                  src={src}
                  alt={name}
                  className="w-full h-40 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoList.map(([name, src], i) => (
              <div
                key={i}
                className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                onClick={() => {
                  pauseAllVideos()
                  setActiveVideoIndex(i)
                }}
              >
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={src}
                  controls
                  muted
                  preload="metadata"
                  controlsList="nodownload"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                  <svg className="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* IMAGE LIGHTBOX */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveImageIndex(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={imageList[activeImageIndex][1]}
              alt={imageList[activeImageIndex][0]}
              className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setActiveImageIndex(null)}
              className="absolute top-4 right-4 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-black/90"
            >
              ×
            </button>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center text-4xl hover:bg-black/90"
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center text-4xl hover:bg-black/90"
            >
              ›
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {activeImageIndex + 1} / {imageList.length}
            </div>
          </div>
        </div>
      )}

      {/* VIDEO LIGHTBOX */}
      {activeVideoIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          onClick={() => setActiveVideoIndex(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <video
              key={activeVideoIndex} // forces fresh playback
              src={videoList[activeVideoIndex][1]}
              autoPlay
              controls
              controlsList="nodownload"
              className="w-full h-auto max-h-[85vh] rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setActiveVideoIndex(null)}
              className="absolute top-4 right-4 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-black/90"
            >
              ×
            </button>
            {videoList.length > 1 && (
              <>
                <button
                  onClick={prevVideo}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center text-4xl hover:bg-black/90"
                >
                  ‹
                </button>
                <button
                  onClick={nextVideo}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 text-white rounded-full w-12 h-12 flex items-center justify-center text-4xl hover:bg-black/90"
                >
                  ›
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                  {activeVideoIndex + 1} / {videoList.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}