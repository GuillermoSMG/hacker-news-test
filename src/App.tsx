import { Route } from 'wouter'
import { lazy, Suspense } from 'react'

import Header from './components/Header'

const TopStoriesPage = lazy(() => import('./pages/TopStoriesPage'))
const DetailPage = lazy(() => import('./pages/DetailPage'))

function App () {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={null}>
          <Route path='/' component={TopStoriesPage} />
          <Route path='/article/:id' component={DetailPage} />
        </Suspense>
      </main>
    </>
  )
}

export default App
