import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { Comment } from "../models/Comment"


class CommentsService {

  async createComment(commentData) {

    const response = await api.post('api/comments', commentData)
    console.log('commentData', response.data)
    const newComment = new Comment(response.data)
    console.log('newComment', newComment)
    AppState.comments.push(newComment)
  }

  async getEventComments(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`)
    console.log('getting all comments', response.data)
    AppState.comments = response.data.map(comment => new Comment(comment))

  }

}

export const commentsService = new CommentsService()