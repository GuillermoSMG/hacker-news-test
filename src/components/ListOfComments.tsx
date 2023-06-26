import useSWR from 'swr'
import { getItemInfo } from '../services/hacker-news'
import { CommentLoader } from './CommentLoader'

const Comment = (props: {
  id: number
}) => {
  const { id } = props

  const { data, isLoading } = useSWR(`/story/${id}`, () => getItemInfo(Number(id)))

  if (isLoading) {
    return <CommentLoader />
  }

  const { by, text, kids, time } = data

  return (
    <>
      <details open>
        <summary>
          <small>
            <span>{by}</span>
            <span>&bull;</span>
            <span>4 hours ago</span>
          </small>
        </summary>
        <p>{text}</p>
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
