import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LangContext } from '../App'
import docs from '../assets/UMOWA-Easy-L-L.pdf'

export default function Offer() {
  const { t } = useContext(LangContext)
  const navigate = useNavigate()

  const handleCourseClick = () => {
    navigate('/application')
  }

  return (
    <section className='max-w-5xl mx-auto py-16 px-4'>
      <h2 className='text-3xl font-bold text-sky-700 mb-4'>
        {t.offer.title}
      </h2>
      <p className='mb-6 text-gray-700'>
        {t.offer.description ?? ''}
      </p>

      {/* --- Detailed Description Section --- */}
      <div className='text-gray-700 leading-relaxed mb-10'>
        <p className='mb-4'>{t.offer.detailedText1}</p>
        <p className='mb-4'>{t.offer.detailedText2}</p>

        <h3 className='text-xl font-semibold mt-6 mb-2'>
          {t.offer.classTopicsTitle}
        </h3>
        <ul className='list-disc ml-6 mb-4'>
          {t.offer.classTopics.map((topic, i) => (
            <li key={i}>{topic}</li>
          ))}
        </ul>

        <p className='mb-4'>{t.offer.speakingBarrier}</p>

        <h3 className='text-xl font-semibold mt-6 mb-2'>
          {t.offer.trainingTitle}
        </h3>
        <ul className='list-disc ml-6 mb-4'>
          {t.offer.trainings.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p className='mb-6'>{t.offer.businessCourses}</p>
        <p className='mb-6'>{t.offer.contactInfo}</p>

        <a
          href={docs}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block mt-4 px-6 py-3 bg-sky-700 text-white font-semibold rounded hover:bg-sky-800 transition'
        >
          {t.offer.printContract}
        </a>
      </div>

      {/* --- Grid of Courses --- */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {t.offer.courses.map((c, i) => (
          <article
            key={i}
            onClick={handleCourseClick}
            className='p-4 rounded shadow-sm bg-white cursor-pointer hover:shadow-md hover:bg-sky-50 transition'
          >
            <h3 className='font-semibold mb-2 text-sky-700'>{c}</h3>
            <p className='text-sm text-gray-600'>
              {t.offer.learnMore}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
