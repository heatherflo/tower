import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { Ticket } from "../models/Ticket"

class TicketsService {

  async buyTicket(ticketData) {
    const response = await api.post(`api/tickets`, ticketData)
    console.log('buyingTicket', response.data)
    const newTicket = new Ticket(response.data)
    AppState.tickets.push(newTicket)
  }

  async getMyTickets() {
    const response = await api.get('account/tickets')
    console.log('getting my tickets', response.data)
    const newTickets = response.data.map(ticket => new Ticket(ticket))
    AppState.tickets.push(newTickets)
  }

  async getOtherPeoplesEventTickets(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    //TODO ask why this is pulling an error when it goes to the page like it's supposed to
    console.log('getting others events', response.data)
    let othersTickets = response.data.map(ticket => new Ticket(ticket))
    AppState.othersTickets = othersTickets
  }
}

export const ticketsService = new TicketsService()