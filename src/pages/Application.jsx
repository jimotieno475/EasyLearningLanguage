import React, { useContext } from 'react'
import { LangContext } from '../App'

export default function Application() {
  const { t } = useContext(LangContext)

  return (
    <section className='max-w-2xl mx-auto py-16 px-4'>
      <h2 className='text-2xl font-bold text-sky-700 mb-4'>
        {t.application.title}
      </h2>
      <p className='text-gray-700 mb-6'>{t.application.notice}</p>

      <form
        className='space-y-3 bg-gray-50 p-6 rounded-lg shadow-sm'
        onSubmit={(e) => {
          e.preventDefault()
          alert('Form submitted (demo)')
        }}
      >
        <input
          className='w-full p-2 border rounded'
          placeholder={t.application.form.name}
          required
        />
        <input
          className='w-full p-2 border rounded'
          type='email'
          placeholder={t.application.form.email}
          required
        />
        <input
          className='w-full p-2 border rounded'
          type='tel'
          placeholder={t.application.form.phone}
          required
        />
        <input
          className='w-full p-2 border rounded'
          placeholder={t.application.form.subject}
        />
        <textarea
          className='w-full p-2 border rounded'
          placeholder={t.application.form.message}
          rows='4'
        />
        <button className='px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 transition'>
          {t.application.form.send}
        </button>
      </form>
    </section>
  )
}
