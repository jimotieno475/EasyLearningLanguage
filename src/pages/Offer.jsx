import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LangContext } from '../App'

export default function Offer() {
  const { t } = useContext(LangContext)
  const navigate = useNavigate()

  const handleCourseClick = () => {
    navigate('/signup')
  }

  return (
    <section className="offer-section font-sans py-16 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <h2 className="text-4xl font-bold text-sky-700 mb-4">
          {t.offer.title}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t.offer.description}
        </p>
      </div>

      {/* Skills Section */}
      <div className="skills flex flex-wrap justify-center gap-6 mb-16 px-4">
        {t.offer.skills.map((skill, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 w-64 text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-5xl mb-3">{skill.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {skill.title}
            </h3>
            <p className="text-gray-600">{skill.text}</p>
          </div>
        ))}
      </div>

      {/* Courses Section */}
      <div className="courses flex flex-wrap justify-center gap-6 mb-16 px-4">
        {t.offer.courses.map((course, index) => (
          <div
            key={index}
            onClick={handleCourseClick}
            className={`${course.color} rounded-xl p-6 w-56 text-center hover:shadow-md transition-shadow cursor-pointer hover:scale-105 transform transition-all duration-200`}
          >
            <div className="text-4xl mb-2">{course.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {course.title}
            </h3>
            <p className="text-gray-600">{course.text}</p>
          </div>
        ))}
      </div>

      {/* Why Us Section */}
      <div className="why-us text-center px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          {t.offer.whyUsTitle}
        </h3>
        <ul className="list-none text-gray-700 text-lg space-y-2">
          {t.offer.whyUsPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
        <p className="mt-6 text-lg text-gray-700">
          {t.offer.contact}
        </p>
      </div>
    </section>
  )
}