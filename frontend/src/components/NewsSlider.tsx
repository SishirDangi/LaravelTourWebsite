import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Megaphone } from 'lucide-react'

const updates = [
  '🚶 Annapurna Base Camp Trek starts from Sept 5',
  '❄️ Everest Region snow report updated',
  '🧾 New permits available for Manaslu Circuit',
  '📢 Notice: Trekking guide mandatory from October',
  '🛑 Restricted areas updated for 2025 season'
]

const NewsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % updates.length)
    }, 4000) // Slide every 4 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <div
      className='relative bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-400 text-white py-3 px-4 overflow-hidden'
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className='flex items-center gap-2'>
        <Megaphone className='w-5 h-5 animate-pulse' />
        <div className='relative h-6 sm:h-8 overflow-hidden w-full'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='absolute w-full text-sm sm:text-base font-medium text-center'
            >
              {updates[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default NewsSlider
