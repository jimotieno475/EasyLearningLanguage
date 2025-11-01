import React, { useContext } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { LangContext } from '../App'
import Logo from '../assets/logo5.png'
import front from '../assets/logo1.jpg'


export default function Home() {
  const { t } = useContext(LangContext)
  const navigate=useNavigate()

  const HandleSignup =()=>{
    navigate('/signup')
  }

  return (
    <>
      {/* Hero Section */}
      <section
        className='relative h-screen bg-cover bg-center flex flex-col items-center justify-center text-center overflow-hidden'
        style={{ backgroundImage: `url(${front})` }}
      >
        <div className='absolute inset-0 bg-black/40'></div>

        <div className='relative z-10 text-white px-6'>
          <h1 className='text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg'>
            {t.home.title}
          </h1>
          <p className='text-lg md:text-xl mb-2 max-w-2xl mx-auto drop-shadow-md'>
            {t.home.subtitle}
          </p>
            <p className='text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md'>
            {t.home.subsubtitle}
          </p>
          <div className='flex justify-center gap-4'>
            <button
              onClick={HandleSignup}
              href='/signup'
              className='px-6 py-3 rounded bg-white text-sky-700 font-semibold hover:bg-sky-100 transition'
            >
              {t.cta?.enroll ?? 'Sign up'}
            </button>
            <button
              onClick={()=>navigate('/contact')}
              href=''
              className='px-6 py-3 rounded border border-white text-white font-semibold hover:bg-white hover:text-sky-700 transition'
            >
              {t.cta?.readMore ?? 'Contact'}
            </button>
          </div>
        </div>

        {/* Bottom-left logo */}
        <img
          src={Logo}
          alt='Easy Learning Logo'
          className='absolute bottom-6 left-6 w-40 md:w-56 opacity-95 hover:scale-105 transition-transform duration-500'
        />
      </section>

      {/* Info Section */}
      <section className='bg-white py-20 px-6'>
        <div className='container mx-auto max-w-4xl text-center'>
          <h2 className='text-3xl font-bold text-sky-700 mb-6'>
            {t.home.infoTitle}
          </h2>
          <p className='text-gray-700 leading-relaxed text-lg whitespace-pre-line'>
            {t.home.infoText}
          </p>
        </div>
      </section>

{/* Courses Section */}
<section className='bg-blue-50 py-20 px-6'>
  <div className='container mx-auto max-w-6xl'>
    <h2 className='text-3xl font-bold text-sky-700 text-center mb-12'>
      {t.offer.title || 'Our Courses'}
    </h2>

    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
      {t.home.courses.map((course, index) => (
        <div
          key={index}
          className='bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300'
        >
          <div>
            <h3 className='text-xl font-semibold text-sky-700 mb-3'>{course.title}</h3>
            <p className='text-gray-700 mb-4'>{course.text}</p>
          </div>
          <div className="mt-auto flex justify-between items-center pt-4">
            <Link
              to={course.title === 'Kontakt' || course.title === 'Contact' ? '/contact' : '/offer'}
              className="text-sky-600 font-semibold hover:underline"
            >
              {course.cta}
            </Link>
          
            <button
              onClick={() => navigate('/signup')}
              className="text-sky-700 font-semibold hover:underline"
            >
              {t.cta?.enroll ?? 'Sign up'}
            </button>
          </div>
          
        </div>
      ))}
    </div>
  </div>
</section>

    </>
  )
}
