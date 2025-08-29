export interface Blog {
  id: string
  image: string
  title: string
  author: string
  date: string
  description: string
}

export const blogPosts: Blog[] = [
  {
    id: '1',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress',
    title: 'Top 5 Hidden Treks in Nepal',
    author: 'Amit Basnet',
    date: 'July 20, 2025',
    description:
      'Nepal is home to countless hidden gems for trekking enthusiasts. Discover 5 treks off the beaten path that offer breathtaking views and authentic cultural experiences.'
  },
  {
    id: '2',
    image:
      'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress',
    title: 'Everest Base Camp: What You Need to Know',
    author: 'Sita Gurung',
    date: 'July 15, 2025',
    description:
      'Planning your Everest Base Camp trek? Here’s everything you need to prepare, from fitness to permits, and what to expect on the trail.'
  },
  {
    id: '3',
    image:
      'https://images.pexels.com/photos/240040/pexels-photo-240040.jpeg?auto=compress',
    title: 'Langtang Valley: Trekking After the Earthquake',
    author: 'Pema Sherpa',
    date: 'July 10, 2025',
    description:
      'The Langtang Valley trek is not only scenic but also a testament to the resilience of the people. Find out how the area has recovered and why it’s a must-visit.'
  },
  {
    id: '4',
    image:
      'https://images.pexels.com/photos/1533720/pexels-photo-1533720.jpeg?auto=compress',
    title: 'Annapurna Circuit Trekking Guide',
    author: 'Bikash Shrestha',
    date: 'July 5, 2025',
    description:
      'The Annapurna Circuit is one of Nepal’s most diverse and popular treks. This guide covers everything you need to know for a successful journey.'
  }
]
