import { dbContext } from "../db/DbContext.js"
import { eventsService } from "./EventsService.js"
import { BadRequest } from "../utils/Errors.js"

class CommentsService {

  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }

  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
    return comments
  }
  //TODO make sure this deletes the comment actually made by the user
  async deleteComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.findById(commentId, userId).populate('creator')
    if (!commentToDelete) {
      throw new Error('Wait, there is no comment to delete')
    }
    // // @ts-ignore
    // if (commentToDelete.accountId = !userId) {
    //   throw new Error("oops, you can't delete this comment cause you didn't make it")
    // }
    await commentToDelete.deleteOne()
    return 'comment was removed'
  }




}

export const commentsService = new CommentsService()