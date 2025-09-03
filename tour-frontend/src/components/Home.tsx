import AdventurePicker from './AdventurePicker'
import CallToAction from './CallToAction'
import FeaturesSection from './FeaturesSection'
import LandingPage from './LandingPage'
import PopularTourWithoutlayout from'./PopularTourWithoutLayout'
import ServicesSectionHome from './ServicesSectionHome'
import TestimonialsSection from './TestimonialsSection'
import BlogPageHome from './BlogPageHome'
const Home = () => {
  return (
    <div>
      <LandingPage />
      <AdventurePicker />
      <ServicesSectionHome />
      <PopularTourWithoutlayout />
      <FeaturesSection />
      <CallToAction />
      <TestimonialsSection />
      <BlogPageHome />
    </div>
  )
}

export default Home