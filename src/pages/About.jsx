import React, { useContext } from 'react'
import { LangContext } from '../App'

export default function About() {
  const { t } = useContext(LangContext)

  return (
    <section className='max-w-4xl mx-auto py-16 px-4'>
      <h2 className='text-3xl font-bold text-sky-700 mb-4'>
        {t.about.title}
      </h2>

      <p className='text-gray-700 leading-relaxed mb-6'>
        {t.about.text}
      </p>

      <p className='text-gray-700 leading-relaxed text-lg'>
        {t.about.extended}
      </p>
    </section>
  )
}
