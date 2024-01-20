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
    const myTickets = await dbContext.Tickets.find({ accountId: userId }).populate('event').populate('profile', 'name picture')
    return myTickets
  }
  async getOtherPeoplesEventTickets(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
    return eventTickets
  }
  //TODO match this with the deleteCollaborator in reference
  async deleteMyTicket(ticketId, userId) {
    const ticketToDelete = await (await dbContext.Tickets.findById(ticketId, userId)).populate('event')
    if (!ticketToDelete) {
      throw new Error('Wait, there is no ticket')
    }
    await ticketToDelete.deleteOne()
    return 'comment was removed'
  }

}

export const ticketsService = new TicketsService()