import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"


class EventsService {

  async createEvent(eventData) {
    const event = await dbContext.Events.create(eventData)
    await event.populate('creator', 'name picture')
    return event
  }

  async getAllEvents() {
    const events = await dbContext.Events.find().populate('creator', 'name picture')
    return events
  }

  async getEventById(eventId) {
    const event = await dbContext.Events.findById(eventId).populate('creator', 'name picture')
    if (!event) {
      throw new BadRequest(`Invalid id: ${eventId}`)
    }
    return event
  }
  // TODO see what is wrong with this function to make my test work correctly in Postman
  async editEventById(eventId, eventData) {
    const event = (await (await dbContext.Events.findById(eventId)).populate('creator', 'name picture', eventData))
    if (!event) {
      throw new BadRequest(`Cannot edit: ${eventId}`)
    }
    // Object.assign(event, eventData)
    await event.save()
    return event
  }


}




export const eventsService = new EventsService()