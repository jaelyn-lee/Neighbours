import db from './connection'
import {
  AddClaRequest,
  ClaRequestDataBackend,
  newRequestToBackend,
} from '../../models/classified'
import { AddAnswer, AnswersToBackend } from '../../models/comments'

export async function getAllClassificationsByLocation(locationId: number) {
  return (await db('classified_request')
    .join('locations', 'locations.id', 'classified_request.location_id')
    .join('users', 'users.auth0_id', 'classified_request.user_auth0_id')
    .where('locations.id', locationId)
    .select(
      'classified_request.id',
      'users.first_name as user_name',
      'locations.name as location',
      'classified_request.title',
      'classified_request.image',
      'classified_request.date',
      'classified_request.venue',
      'classified_request.description'
    )) as ClaRequestDataBackend[]
}

export async function getClassificationById(id: number) {
  return (await db('classified_request')
    .join('locations', 'locations.id', 'classified_request.location_id')
    .join('users', 'users.auth0_id', 'classified_request.user_auth0_id')
    .where('classified_request.id', id)
    .select(
      'classified_request.id',
      'users.first_name as user_name',
      'locations.name as location',
      'classified_request.title',
      'classified_request.image',
      'classified_request.date',
      'classified_request.venue',
      'classified_request.description'
    )
    .first()) as ClaRequestDataBackend
}

export async function getClassificationByUserAuthId(id: string) {
  return (await db('classified_request')
    .join('locations', 'locations.id', 'classified_request.location_id')
    .join('users', 'users.auth0_id', 'classified_request.user_auth0_id')
    .where('user_auth0_id', id)
    .select(
      'classified_request.id',
      'users.first_name as user_name',
      'locations.name as location',
      'classified_request.title',
      'classified_request.image',
      'classified_request.date',
      'classified_request.venue',
      'classified_request.description'
    )) as ClaRequestDataBackend[]
}

export function addRequest(request: newRequestToBackend) {
  return db('classified_request').insert(request)
}

export function updateRequest(Updatedrequest: newRequestToBackend, id: number) {
  const newObj = { ...Updatedrequest }

  return db('classified_request').where('id', id).update(newObj)
}

export function deleteRequestById(requestId: number, userAuth0Id: string) {
  return db('classified_request')
    .where('id', requestId)
    .where('user_auth0_id', userAuth0Id)
    .delete()
}

//answers db functions

export async function getAllAnswersByRequest(requestId: number) {
  return await db('classified_request_answers')
    .join(
      'classified_request',
      'classified_request.id',
      'classified_request_id'
    )
    .join('users', 'users.auth0_id', 'classified_request_answers.user_auth0_id')
    .where('classified_request_answers.classified_request_id', requestId)
    .select(
      'classified_request_answers.id',
      'users.first_name as user_name',
      'classified_request_answers.comment'
    )
}

export function addAnswer(answer: AnswersToBackend) {
  return db('classified_request_answers').insert(answer)
}

export function updateAnswer(UpdatedAnswer: AddAnswer, id: number) {
  const newObj = { ...UpdatedAnswer }

  return db('classified_request_answers').where('id', id).update(newObj)
}

export async function deleteAnswerById(answerId: number, userAuth0Id: string) {
  const comment = await db('classified_request_answers')
    .select('user_auth0_id')
    .where('id', answerId)
    .first()
  if (comment.user_auth0_id !== userAuth0Id) {
    throw new Error('Unauthorized, user is not author of comment')
  }

  await db('classified_request_answers').where('id', answerId).del()
}
