import React from 'react'
import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'What is the best time to trek in Nepal?',
    answer:
      'The best times are pre-monsoon (March-May) and post-monsoon (September-December) seasons, offering clear mountain views and stable weather.'
  },
  {
    question: 'Do I need previous trekking experience?',
    answer:
      'We offer treks for all experience levels. Our guides will assess your fitness and recommend the most suitable route for your abilities.'
  },
  {
    question: 'What permits do I need for trekking?',
    answer:
      'Depending on your chosen trek, you may need TIMS card, National Park permits, or restricted area permits. We handle all permit arrangements for you.'
  },
  {
    question: 'Is travel insurance required?',
    answer:
      'Yes, comprehensive travel insurance including helicopter evacuation coverage is mandatory for all our treks for your safety and peace of mind.'
  }
]

const FAQSection: React.FC = () => {
  return (
    <section className='py-16 bg-orange-50' id='faq'>
      <div className='container mx-auto px-4 max-w-4xl'>
        <motion.div
          className='text-center mb-12'
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className='flex justify-center mb-4'>
            <HelpCircle className='w-10 h-10 text-orange-600' />
          </div>
          <h2 className='text-3xl md:text-4xl font-bold text-[#1E293B]'>
            Frequently Asked Questions
          </h2>
          <p className='text-lg text-gray-700 mt-2'>
            Quick answers to common questions about trekking in Nepal
          </p>
        </motion.div>

        <div className='space-y-6'>
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className='bg-white rounded-xl p-6 shadow-md'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className='text-lg font-semibold text-[#1E293B] mb-3'>
                {faq.question}
              </h3>
              <p className='text-gray-600 leading-relaxed'>{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
