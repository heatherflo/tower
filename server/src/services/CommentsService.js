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

}

export const commentsService = new CommentsService()