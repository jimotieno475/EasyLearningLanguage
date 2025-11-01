import React, { useContext, useState } from 'react'
import { LangContext } from '../App'

export default function Contact() {
  const { t } = useContext(LangContext)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone') || 'N/A',
      subject: 'Website Contact Form',
      message: formData.get('message'),
    }

    try {
      const res = await fetch('/sendMail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      // Get the raw text response
      const rawText = await res.text()
      
      // Check if response is empty
      if (!rawText || rawText.trim() === '') {
        throw new Error('Server returned empty response')
      }

      let result
      try {
        // Try to parse as JSON
        result = JSON.parse(rawText.trim())
      } catch (jsonError) {
        // If it's not valid JSON, check if it's an HTML error page
        if (rawText.includes('<html') || rawText.includes('<!DOCTYPE')) {
          throw new Error('Server returned HTML error page instead of JSON')
        } else {
          throw new Error('Server returned invalid JSON response')
        }
      }

      // Now handle the parsed result
      if (result.status === 'success') {
        setStatus('✅ ' + (result.message || 'Message sent successfully!'))
        e.target.reset()
      } else {
        setStatus('❌ ' + (result.message || 'Failed to send message. Please try again.'))
      }

    } catch (error) {
      setStatus('⚠️ ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='max-w-2xl mx-auto py-16 px-4'>
      <h2 className='text-2xl font-bold text-sky-700 mb-4'>
        {t.contact.title}
      </h2>

      <p className='text-gray-700 mb-6'>
        {t.contact.text ?? t.contact.intro}
      </p>

      {/* Contact Form */}
      <form
        className='space-y-3 mb-6 bg-gray-50 p-6 rounded-lg shadow-sm'
        onSubmit={handleSubmit}
      >
        <input
          className='w-full p-2 border rounded'
          name='name'
          placeholder={t.contact.form?.name ?? 'Name'}
          required
        />
        <input
          className='w-full p-2 border rounded'
          type='email'
          name='email'
          placeholder={t.contact.form?.mail ?? 'Email'}
          required
        />
        <input
          className='w-full p-2 border rounded'
          type='tel'
          name='phone'
          placeholder={t.contact.form?.phone ?? 'Phone Number (Optional)'}
        />
        <textarea
          className='w-full p-2 border rounded'
          name='message'
          placeholder={t.contact.form?.message ?? 'Message'}
          rows='4'
          required
        />
        <button
          type="submit"
          disabled={loading}
          className='px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 transition disabled:opacity-70'
        >
          {loading ? 'Sending...' : (t.contact.form?.send ?? 'Send')}
        </button>

        {status && (
          <p className={`text-center mt-2 ${
            status.includes('✅') ? 'text-green-600' : 
            status.includes('❌') ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {status}
          </p>
        )}
      </form>

      {/* Contact Info */}
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