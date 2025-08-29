import React, { useState, useEffect } from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    const documentHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight

    if (scrollPosition > documentHeight * 0.4 - windowHeight) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className='fixed bottom-5 right-5 z-50 p-3 bg-orange-600 text-white rounded-full shadow-lg cursor-pointer transition-transform transform hover:scale-110'
          aria-label='Scroll to top'
        >
          <FaArrowAltCircleUp size={30} />
        </button>
      )}
    </>
  )
}

export default ScrollToTopButton
