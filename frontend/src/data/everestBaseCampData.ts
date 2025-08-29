const everestBaseCampData = {
  title: 'Everest Base Camp Trek (EBC)',
  duration: '14 Days',
  difficulty: 'Moderate to Strenuous',
  maxAltitude: '5,545m (Kalapatthar)',
  region: 'Everest (Khumbu) Region',
  bestSeason: 'Spring (Mar-May) & Autumn (Sep-Nov)',
  image:
    'https://www.nepalhightrek.com/wp-content/uploads/2023/10/10-Important-Things-To-Know-About-EBC-Trek.webp',

  overview: `The Everest Base Camp Trek is one of the most iconic trekking routes in the world. Located in the Khumbu region of Nepal, it offers trekkers a once-in-a-lifetime opportunity to explore the world’s tallest mountain up close. From bustling Sherpa villages and ancient monasteries to dramatic glaciers and panoramic Himalayan views, the journey is as culturally enriching as it is scenic.`,

  highlights: [
    'Stunning flight to Lukla – the world’s most thrilling airstrip',
    'Panoramic views of Mt. Everest, Lhotse, Nuptse, Ama Dablam',
    'Experience Sherpa culture in villages like Namche Bazaar',
    'Visit Tengboche Monastery – the largest in Khumbu region',
    'Trek through Sagarmatha National Park – a UNESCO World Heritage Site',
    'Reach Everest Base Camp and hike up to Kala Patthar for sunrise view'
  ],

  itinerary: [
    {
      day: 1,
      title: 'Arrival in Kathmandu (1,400m)',
      description: 'Transfer to hotel. Trek briefing in the evening.'
    },
    {
      day: 2,
      title: 'Fly to Lukla (2,860m) & Trek to Phakding (2,610m)',
      description: 'Scenic flight & easy walk to Phakding.'
    },
    {
      day: 3,
      title: 'Phakding to Namche Bazaar (3,440m)',
      description: 'Cross suspension bridges and climb through pine forest.'
    },
    {
      day: 4,
      title: 'Acclimatization Day in Namche',
      description: 'Hike to Everest View Hotel or Khumjung village.'
    },
    {
      day: 5,
      title: 'Namche to Tengboche (3,867m)',
      description:
        'Spectacular views of Ama Dablam & visit Tengboche Monastery.'
    },
    {
      day: 6,
      title: 'Tengboche to Dingboche (4,410m)',
      description: 'Descend to Debuche and climb to Pangboche & Dingboche.'
    },
    {
      day: 7,
      title: 'Acclimatization in Dingboche',
      description: 'Climb Nagarjun Hill or explore local terrain.'
    },
    {
      day: 8,
      title: 'Dingboche to Lobuche (4,910m)',
      description: 'Pass through Dughla & see memorials of lost climbers.'
    },
    {
      day: 9,
      title: 'Lobuche to Gorak Shep & Everest Base Camp (5,364m)',
      description: 'Reach EBC and return to Gorak Shep.'
    },
    {
      day: 10,
      title: 'Hike Kala Patthar (5,545m) & descend to Pheriche (4,240m)',
      description: 'Early morning hike for sunrise views.'
    },
    {
      day: 11,
      title: 'Pheriche to Namche',
      description:
        'Long descent through beautiful forests and Sherpa settlements.'
    },
    {
      day: 12,
      title: 'Namche to Lukla',
      description: 'Final trekking day. Celebrate your journey.'
    },
    {
      day: 13,
      title: 'Fly back to Kathmandu',
      description: 'Transfer to hotel and free time.'
    },
    {
      day: 14,
      title: 'Departure from Kathmandu',
      description: 'Final departure or onward travel.'
    }
  ],

  mapEmbedUrl:
    'https://www.google.com/maps/d/u/0/embed?mid=1U8n-Hexample-MapID', // Use your real embedded map if needed

  includes: [
    'Airport transfers in Kathmandu',
    'Domestic flight (Kathmandu–Lukla–Kathmandu)',
    'All necessary trekking permits (TIMS & Sagarmatha National Park)',
    'Full-board meals (breakfast, lunch, dinner) during trek',
    'Lodging in tea houses during trek',
    'Experienced licensed English-speaking guide & porter',
    'Emergency medical kit & pulse oximeter',
    'Down jacket and sleeping bag (if needed)'
  ],

  excludes: [
    'International flights to/from Nepal',
    'Nepal visa fees',
    'Travel & rescue insurance',
    'Personal trekking gear',
    'Wi-Fi, hot showers, battery charging (at lodges)',
    'Tips for guide & porter',
    'Any other expenses not mentioned in "Includes"'
  ],

  faqs: [
    {
      question: 'How difficult is the Everest Base Camp Trek?',
      answer:
        'The trek is moderately challenging with some strenuous days. Anyone in good physical shape can complete it with proper preparation and acclimatization.'
    },
    {
      question: 'Do I need prior trekking experience?',
      answer:
        'Prior experience helps but is not mandatory. Regular walking, cardio, and strength exercises before the trek are recommended.'
    },
    {
      question: 'Is altitude sickness common?',
      answer:
        'Yes, due to high elevations. Proper acclimatization days are included to minimize risk. Guides monitor your health closely.'
    },
    {
      question: 'Is the internet available during the trek?',
      answer:
        'Yes, most teahouses offer paid Wi-Fi (Everest Link). However, the speed can be slow, especially at higher altitudes.'
    }
  ],

  upcomingEvents: [
    {
      title: 'Autumn Trek 2025',
      date: 'October 5–18, 2025',
      seatsLeft: 5
    },
    {
      title: 'Spring Trek 2026',
      date: 'April 10–23, 2026',
      seatsLeft: 8
    }
  ]
}

export default everestBaseCampData
