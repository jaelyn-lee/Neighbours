import { useEffect, useState } from 'react'
import { UserData } from '../../../models/user'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { fetchLocations, upsertProfile } from '../../apis/registration'
import { useMutation, useQuery } from 'react-query'
import Map from '../Map/Map'

function RegisterUser() {
  const { user, getAccessTokenSilently } = useAuth0()

  // calls the locations
  const { isLoading, data: locationData } = useQuery(
    'fetchLocations',
    async () => {
      return await fetchLocations()
    }
  )

  const navigate = useNavigate()
  const [userData, setUserData] = useState<UserData>({
    first_name: '',
    last_name: '',
    name: '',
    email: '',
    location_id: 0,
    pronouns: '',
    bio: '',
  })

  //data is called and then mutated
  const mutations = useMutation({
    mutationFn: ({ userData, token }: { userData: UserData; token: string }) =>
      upsertProfile(userData, token),
    onSuccess: async () => {
      console.log('added, I am in the mutation')
    },
  })
  useEffect(() => {
    if (user) {
      Promise.resolve(user)
        .then((resolvedUser) => {
          if (resolvedUser.email && resolvedUser.sub) {
            const userDraftData: UserData = {
              ...userData,
              email: resolvedUser.email,
            }

            setUserData(userDraftData)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [user])

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.value
    const newUserData = { ...userData, [name]: value }
    setUserData(newUserData)
  }

  function handleSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = +event.target.value
    const currentUserData: UserData = {
      ...userData,
      location_id: value,
    }
    setUserData(currentUserData)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const location = locationData?.find(
      (location) => location.id === userData.location_id
    )
    const userLocationId = location?.id
    navigate(`/${userLocationId}`)
    console.log('submitted', userData)
    const token = await getAccessTokenSilently()
    mutations.mutate({ userData, token })
  }

  return (
    <div className="mr-6">
      <div className="text-center text-2xl font-semibold my-5">
        <h2>Tell us about yourself</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col drop-shadow-xl">
        <div className="flex flex-col ">
          <label htmlFor="firstName" className="pl-7 pb-2 text-lg">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            name="first_name"
            placeholder="e.g. Mary"
            value={userData.first_name}
            onChange={handleChange}
            className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="lastName" className="pl-7 pb-2 text-lg">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            name="last_name"
            placeholder="e.g. Anne"
            value={userData.last_name}
            onChange={handleChange}
            className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="pronouns" className="pl-7 pb-2 text-lg">
            Pronouns
          </label>
          <input
            type="text"
            name="pronouns"
            placeholder="e.g. She/her, He/his, They/them"
            value={userData.pronouns}
            onChange={handleChange}
            className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
          />
        </div>

        <div className="flex flex-col ">
          <label htmlFor="bio" className="pl-7 pb-2 text-lg">
            Bio
          </label>
          <input
            type="text"
            name="bio"
            placeholder=""
            value={userData.bio}
            onChange={handleChange}
            className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 h-20 rounded-sm"
          />
        </div>
        <div className="text-center text-2xl font-semibold mb-5">
          <h2>Find your Neighbours</h2>
        </div>

        <div className="flex flex-col ">
          <label htmlFor="location" className="pl-7 pb-2 text-lg">
            Location
          </label>
          <select
            name="location"
            value={userData.location_id}
            onChange={handleSelect}
            className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
          >
            <option>New Zealand</option>
          </select>
        </div>

        <div className="flex flex-col ">
          <select
            name="location"
            value={userData.location_id}
            onChange={handleSelect}
            className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
          >
            <option>Auckland</option>
          </select>
        </div>

        <div className="flex flex-col ">
          <select
            name="location"
            value={userData.location_id}
            onChange={handleSelect}
            className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 rounded-sm"
          >
            <option value="">Select location</option>
            {!isLoading &&
              locationData &&
              locationData.map((suburb) => (
                <option key={suburb.id} value={suburb.id}>
                  {suburb.name}
                </option>
              ))}
          </select>
          <div className="flex flex-col pl-7 pb-2 text-lg mb-4">
            <Map />
          </div>
          <br />
        </div>
        <button
          type="submit"
          className=" bg-primary text-white justify-center text-center py-2 px-4 mb-6 ml-6 mt-10 rounded-lg hover:shadow-[0px_0px_9px_2px_#F18A81] drop-shadow-xl"
        >
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterUser
