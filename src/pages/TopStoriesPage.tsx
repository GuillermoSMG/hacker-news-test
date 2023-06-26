import useSWRInfinite from 'swr/infinite'

import Story from '../components/Story'
import { getTopStories } from '../services/hacker-news'
import { useEffect, useRef } from 'react'

const TopStoriesPage = () => {
  // const { data, error, isLoading } = useSWR('stories', () => getTopStories(1, 10))
  const { data, isLoading, size, setSize } = useSWRInfinite((i) => `stories/${i + 1}`,
    (key) => {
      const [,page] = key.split('/')
      return getTopStories(Number(page), 10)
    }
  )

  const infiniteScrollEl = useRef<HTMLSpanElement>(null)

  const stories = data?.flat()

  useEffect(() => {
    // use intersection observer to detect end of the page scroll
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setSize((prevSize) => prevSize + 1)
      }
    }, {
      rootMargin: '100px'
    })

    if (infiniteScrollEl.current == null) {
      return
    }

    observer.observe(infiniteScrollEl.current)

    return () => {
      observer.disconnect()
    }
  }, [isLoading, setSize])

  return (
    <>
      <ul style={{ listStyle: 'none' }}>
        {stories?.map((id: number, index: number) => (
          <li key={id}>
            <Story id={id} index={index} />
          </li>
        ))}
      </ul>
      {!isLoading && <span ref={infiniteScrollEl}>.</span>}
    </>
  )
}
export default TopStoriesPage
