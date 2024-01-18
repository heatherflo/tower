import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"


class TicketsService {
  async buyTicket(ticketData) {
    const event = await eventsService.getEventById(ticketData.eventId)

    if (event.isCanceled) {
      throw new BadRequest(`The event ${event.name} is full.`)
    }
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('creator', 'name picture')
    return ticket
  }

}

export const ticketsService = new TicketsService()