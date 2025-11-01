import React, { useContext } from 'react'
import { LangContext } from '../App'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const { t } = useContext(LangContext)
  const navigate = useNavigate()

  const handleCourseClick = () => {
    navigate('/signup')
  }

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-sky-700 mb-4">
          {t.about.title}
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {t.about.intro}
        </h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {t.about.mainText}
        </p>
      </div>

      {/* Mission Section */}
      <div className="bg-sky-50 rounded-2xl p-8 mb-16">
        <h3 className="text-2xl font-bold text-sky-800 mb-4">
          {t.about.mission.title}
        </h3>
        <p className="text-gray-700 text-lg leading-relaxed">
          {t.about.mission.text}
        </p>
        <p className="mt-6 text-gray-800 font-semibold text-lg">
          {t.about.guarantee}
        </p>
      </div>

      {/* Features Grid */}
      <div className="mb-16">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {t.about.whatMakesUsSpecial}  
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.about.features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-sky-700 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Levels Section */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl p-8 text-white mb-16">
        <h3 className="text-2xl font-bold text-center mb-8">
          {t.about.levels.title}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.about.levels.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white/20 rounded-lg backdrop-blur-sm"
            >
              <span className="text-lg font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gray-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {t.about.cta.title}
        </h3>
        <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
          {t.about.cta.text}
        </p>
        <button onClick={handleCourseClick} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
          {t.about.signUpButton}
        </button>
      </div>
    </section>
  )
}