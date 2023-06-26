import useSWR from 'swr'
import { getItemInfo } from '../services/hacker-news'
import ListOfComments from '../components/ListOfComments'
import { CommentLoader } from '../components/CommentLoader'
import { useEffect } from 'react'

const DetailPage = (props: {
  params: {
    id: string
  }
}) => {
  const { params: { id } } = props

  const { data, isLoading } = useSWR(`/story/${id}`, () => getItemInfo(Number(id)))

  const { kids, title }: { kids: number[], title: string } = data ?? {}

  useEffect(() => {
    document.title = `Hacker News - ${title}`
  }, [title])

  const commentsIds = kids?.slice(0, 10) ?? []

  return (
    <div className=''>
      {isLoading ? null : <ListOfComments ids={commentsIds} />}
    </div>
  )
}
export default DetailPage
