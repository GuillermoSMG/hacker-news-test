import useSWR from 'swr'
import { getItemInfo } from '../services/hacker-news'
import { CommentLoader } from './CommentLoader'
import { getRelativeTime } from '../utils/getRelativeTime'

const Comment = (props: {
  id: number
}) => {
  const { id } = props

  const { data, isLoading } = useSWR(`/story/${id}`, () => getItemInfo(Number(id)))

  if (isLoading) {
    return <CommentLoader />
  }

  const { by, text, kids, time } = data

  const relativeTime = getRelativeTime(time)

  return (
    <>
      <details open>
        <summary>
          <small>
            <span>{by}</span>
            <span>&bull;</span>
            <span>{relativeTime}</span>
          </small>
        </summary>
        <p dangerouslySetInnerHTML={{ __html: text }} />
      </details>
      {kids?.length > 0 && <ListOfComments ids={kids?.slice(0, 10)} />}
    </>
  )
}

const ListOfComments = (props: {
  ids: number[]
}) => {
  const { ids } = props

  return (
    <ul style={{ listStyleType: 'none' }}>
      {
            ids?.map((id: number) => (
              <li key={id}>
                <Comment id={id} />
              </li>
            ))
        }
    </ul>
  )
}
export default ListOfComments
