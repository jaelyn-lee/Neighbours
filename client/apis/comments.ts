import request from 'superagent'
import { AnswerDataBackend } from '../../models/comments'

const rootUrl = '/api/v1/'

export async function fetchComments(
  locationId: number,
  postId: number,
  token: string
) {
  const url = `${rootUrl}locations/${locationId}/classifieds/${postId}`
  const res = await request
    .get(url)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body.answers as AnswerDataBackend[]
}

export async function deleteComment(commentId: number, token: string) {
  const url = `${rootUrl}comments/${commentId}`
  await request
    .delete(url)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
}

export async function postComment(commentId: number, token: string) {
  const url = `${rootUrl}comments/${commentId}`
  await request
    .post(url)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
}
