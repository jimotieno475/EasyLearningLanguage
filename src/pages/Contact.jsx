import React, { useContext } from 'react'
import { LangContext } from '../App'

export default function Contact() {
  const { t } = useContext(LangContext)
  return (
    <section className='max-w-2xl mx-auto py-16 px-4'>
      <h2 className='text-2xl font-bold text-sky-700 mb-4'>{t.contact.title}</h2>
      <p className='text-gray-700 mb-6'>{t.contact.text ?? t.contact.intro}</p>
      <form className='space-y-3 mb-6' onSubmit={(e) => { e.preventDefault(); alert('Form submitted (demo)') }}>
        <input className='w-full p-2 border rounded' placeholder={t.contact.form?.name ?? 'Name'} />
        <input className='w-full p-2 border rounded' placeholder={t.contact.form?.mail ?? 'Email'} />
        <textarea className='w-full p-2 border rounded' placeholder={t.contact.form?.message ?? 'Message'} />
        <button className='px-4 py-2 rounded bg-sky-600 text-white'>{t.contact.form?.send ?? 'Send'}</button>
      </form>
      <dl className='grid grid-cols-1 gap-2 text-gray-700'>
        <div>
          <dt className='font-semibold'>{t.contact.labels.email}</dt>
          <dd>{t.contact.email}</dd>
        </div>
        <div>
          <dt className='font-semibold'>{t.contact.labels.phone}</dt>
          <dd>{t.contact.phone}</dd>
        </div>
        <div>
          <dt className='font-semibold'>{t.contact.labels.address}</dt>
          <dd>{t.contact.address}</dd>
        </div>
        <div>
          <dt className='font-semibold'>{t.contact.labels.hours}</dt>
          <dd>{t.contact.hours}</dd>
        </div>
      </dl>
    </section>
  )
}
