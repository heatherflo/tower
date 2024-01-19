import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"
import { eventsService } from "./EventsService.js"



class TicketsService {
  async buyTicket(ticketData) {
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate('profile', 'name picture')
    await ticket.populate('event')
    return ticket
  }
  async getMyTickets(userId) {
    const myTickets = await dbContext.Tickets.find({ accountId: userId }).populate('event')
    return myTickets
  }
  async getOtherPeoplesEventTickets(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
    return eventTickets
  }

}

export const ticketsService = new TicketsService()