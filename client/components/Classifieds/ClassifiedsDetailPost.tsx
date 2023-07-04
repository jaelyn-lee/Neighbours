import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from '../Comment/Comment'
import { fetchClassifiedPostDetails } from '../../apis/classifiedPost'
import { useQuery } from 'react-query'
import { useAuth0 } from '@auth0/auth0-react'

function ClassifiedsDetailPost() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const locationId = Number(useParams().locationId)
  const postId = Number(useParams().postId)

  const { isLoading, data } = useQuery(
    ['fetchClassifiedPostDetails', locationId, postId],
    async () => {
      const token = await getAccessTokenSilently()
      const response = await fetchClassifiedPostDetails(locationId, postId, token)
      return response
    }
  )

  const hardCodedData = {
    id: 1,
    user_auth0_id: 'auth0_1',
    location_id: 4,
    user_name: 'Sarah',
    title: 'Help Needed: Cockroach in House',
    type: 'Household',
    image: '../../public/images/cockroach.png',
    date: '2023-07-15',
    time: '15:00:00',
    venue: 'My House',
    description:
      "There is a cockroach in my house, and I need someone's help to get rid of it!",
  }

  const hardcodedComments = [
    {
      userId: '1',
      comId: '1',
      fullName: 'John Doe',
      userProfile: '',
      text: 'This is the first comment.',
      avatarUrl: '',
      replies: [],
    },
    {
      userId: '2',
      comId: '2',
      fullName: 'Jane Smith',
      userProfile: '',
      text: 'Here is another comment.',
      avatarUrl: '',
      replies: [],
    },
  ]

  function handleGoBack() {
    navigate(-1)
  }



  return (
    <div className="p-5">
      <FaArrowLeft size={30} onClick={handleGoBack} />
      <img
        className="w-96 m-auto mt-4"
        src={!isLoading && data && data.image}
        alt="cockroach"
      />
      <div className="flex my-2">
        <div className="mr-2">
          <img
            src="../../public/images/userImage.jpg"
            alt={hardCodedData.user_name}
            className="w-10 h-10 rounded-full border-1 border-black"
          />
        </div>
        <div>
          <p className="font-normal">{!isLoading && data && data.user_name}</p>
          <p className="font-light">Newmarket Neighbour</p>
        </div>
      </div>
      <h1 className="font-black text-xl mb-0">{!isLoading && data && data.title}</h1>
      <p className="font-light mt-0">Posted on {!isLoading && data && data.date}</p>
      <div
        className="px-2 pt-2 pb-4
      "
      >
        <p>
          <strong>Venue: </strong>
          {!isLoading && data && data.venue}
        </p>
        <p className="pt-1">{!isLoading && data && data.description}</p>
      </div>
      <div>
        <div className="border-slate-400 border-t-2">
          <Comment
            currentUser={{
              currentUserId: '',
              currentUserImg: '',
              currentUserProfile: '',
              currentUserFullName: '',
            }}
            commentData={hardcodedComments}
            onDeleteComment={function (commentId: string): void {
              throw new Error('Function not implemented.')
            }}
            onAddComment={function (text: string): void {
              throw new Error('Function not implemented.')
            }}
            onReactToComment={function (
              commentId: string,
              reaction: string
            ): void {
              throw new Error('Function not implemented.')
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ClassifiedsDetailPost
function getAccessTokenSilently() {
  throw new Error('Function not implemented.')
}

