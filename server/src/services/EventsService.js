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
  // TODO see what is wrong with this function to make my test work correctly in Postman- may be as a result of the fact that the other things are not passing first in postman
  async editEventById(eventId, eventData) {

    const originalEvent = await this.getEventById(eventId)

    // TODO make sure event is not cancelled before editing

    originalEvent.name = eventData.name ? eventData.name : originalEvent.name
    originalEvent.description = eventData.description ? eventData.description : originalEvent.description
    originalEvent.coverImg = eventData.coverImg ? eventData.coverImg : originalEvent.coverImg
    originalEvent.location = eventData.location ? eventData.location : originalEvent.location
    originalEvent.capacity = eventData.capacity ? eventData.capacity : originalEvent.capacity
    originalEvent.startDate = eventData.startDate ? eventData.startDate : originalEvent.startDate

    originalEvent.type = eventData.type ? eventData.type : originalEvent.type

    await originalEvent.save()
    return originalEvent
  }


  // TODO make this function work so the postman won't throw an error- see above
  async cancelEvent(eventId) {
    const eventToCancel = await this.getEventById(eventId)
    eventToCancel.isCanceled = !eventToCancel.isCanceled

    await eventToCancel.save()
    return eventToCancel
  }

  async getOtherPeoplesEventTickets(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId: eventId })
    // FIXME see which virtuals you have set up on ticket schema
    // .populate('creator', 'name picture')
    return eventTickets
  }



}




export const eventsService = new EventsService()