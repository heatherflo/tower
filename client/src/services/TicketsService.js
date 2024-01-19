import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { Ticket } from "../models/Ticket"

class TicketsService {

  async buyTicket(ticketData) {
    const response = await api.post(`api/tickets`, ticketData)
    console.log('buyingTicket', response.data)
    // FIXME don't forget to pass data to our ticket class!
    const newTicket = new Ticket
    AppState.tickets.push(newTicket)
  }

  //   async getOtherPeoplesEventTickets(eventId) {
  //     const response = await api.get(`api/events/${eventId}/tickets`)
  //     console.log('getting others events', response.data)
  //     let othersTickets = response.data.map(ticket => new Ticket(ticket))
  //     AppState.othersTickets = othersTickets
  //   }
}

export const ticketsService = new TicketsService()