import React, { useContext, useState } from 'react'
import { LangContext } from '../App'

export default function Application() {
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
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    try {
      const res = await fetch('/sendMail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      // FIRST get the raw text response
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
        setStatus('❌ ' + (result.message || 'Failed to send message.'))
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
        {t.application.title}
      </h2>
      <p className='text-gray-700 mb-6'>{t.application.notice}</p>

      <form onSubmit={handleSubmit} className='space-y-3 bg-gray-50 p-6 rounded-lg shadow-sm'>
        <input className='w-full p-2 border rounded' name='name' placeholder={t.application.form.name} required />
        <input className='w-full p-2 border rounded' type='email' name='email' placeholder={t.application.form.email} required />
        <input className='w-full p-2 border rounded' type='tel' name='phone' placeholder={t.application.form.phone} required />
        <input className='w-full p-2 border rounded' name='subject' placeholder={t.application.form.subject} />
        <textarea className='w-full p-2 border rounded' name='message' placeholder={t.application.form.message} rows='4' required />
        <button 
          type="submit"
          disabled={loading} 
          className='px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-700 transition disabled:opacity-50'
        >
          {loading ? 'Sending...' : t.application.form.send}
        </button>
        {status && (
          <p className={`text-center ${
            status.includes('✅') ? 'text-green-600' : 
            status.includes('❌') ? 'text-red-600' : 
            'text-yellow-600'
          }`}>
            {status}
          </p>
        )}
      </form>
    </section>
  )
}