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

}

export const commentsService = new CommentsService()