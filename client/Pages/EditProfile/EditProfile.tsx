import { useEffect, useState } from 'react'
import { UserData, UsersDataBackend } from '../../../models/user'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { useMutation, useQuery } from 'react-query';
// save for later
// import { useMutation, useQueryClient } from 'react-query'

function EditProfile() {
  // for later when connect to backend
  // const queryClient = useQueryClient()
  // const mutations = useMutation(addNewUser, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('getUsers')
  //   }
  // })
  const { user } = useAuth0()

  const navigate = useNavigate()



  const [userData, setUserData] = useState<UsersDataBackend>({
    auth0_id: '',
    first_name: '',
    last_name: '',
    name: '',
    email: '',
    location_id: 0,
    pronouns: '',
    bio: '',
  })
  useEffect(() => {
    if (user) {
      Promise.resolve(user)
        .then((resolvedUser) => {
          if (resolvedUser.email && resolvedUser.sub) {
            const userDraftData: UsersDataBackend = {
              ...userData,
              auth0_id: resolvedUser.sub,
              email: resolvedUser.email,
            }

            setUserData(userDraftData)
          }
        })
        .catch((error) => {
          // Handle any error that occurred during the promise chain
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
    const currentUserData: UsersDataBackend = {
      ...userData,
      location_id: value,
    }
    setUserData(currentUserData)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // code below save for later
    // mutations.mutate(userData)
    //the redirect url need more work
    navigate(`/profile`)
    console.log('submitted', userData)
  }

  // Hardcoded locations data
  const data = [
    { id: 1, name: 'Auckland Central' },
    { id: 2, name: 'Parnell' },
    { id: 3, name: 'Ponsonby' },
    { id: 4, name: 'Newmarket' },
    { id: 5, name: 'Takapuna' },
    { id: 6, name: 'Devonport' },
    { id: 7, name: 'Milford' },
    { id: 8, name: 'Albany' },
    { id: 9, name: 'Henderson' },
    { id: 10, name: 'New Lynn' },
    { id: 11, name: 'Titirangi' },
    { id: 12, name: 'Massey' },
    { id: 13, name: 'Manukau' },
    { id: 14, name: 'Papatoetoe' },
    { id: 15, name: 'Mangere' },
    { id: 16, name: 'Otahuhu' },
    { id: 17, name: 'Howick' },
    { id: 18, name: 'Pakuranga' },
    { id: 19, name: 'Botany Downs' },
    { id: 20, name: 'Half Moon Bay' },
  ]

  // get location data
  // const { isLoading, data } = useQuery(['getLocations'], async () => {
  //   return await getLocations()
  //   console.log(data)
  // })

  return (
    <div className="mr-6">
      <div className="text-center text-2xl font-semibold my-5">
        <h2>Edit Profile</h2>
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
            // placeholder="e.g. Mary"
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
            id='lastName'
            type="text"
            name="last_name"
            // placeholder="e.g. Anne"
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
            // placeholder="e.g. She/her, He/his, They/them"
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
            // placeholder=""
            value={userData.bio}
            onChange={handleChange}
            className=" bg-lightPink flex flex-row py-2 px-4 mb-6 ml-6 h-20 rounded-sm"
          />
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
            {data.map((suburb) => (
              <option key={suburb.id} value={suburb.id}>
                {suburb.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className=" bg-primary text-white justify-center text-center py-2 px-4 mb-6 ml-6 mt-10 rounded-lg hover:shadow-[0px_0px_9px_2px_#F18A81] drop-shadow-xl"
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default EditProfile

