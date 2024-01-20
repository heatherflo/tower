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
    const myTickets = response.data.map(ticket => new Ticket(ticket))
    AppState.myTickets = myTickets
  }

  async getOtherPeoplesEventTickets(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    //TODO ask why this is pulling an error when it goes to the page like it's supposed to
    console.log('getting others events', response.data)
    const othersTickets = response.data.map(ticket => new Ticket(ticket))
    AppState.othersTickets = othersTickets
  }

  async deleteMyTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    console.log('deleting ticket', response.data)
    //TODO finish this so it saves in the appstate and then check for error again
  }
}

export const ticketsService = new TicketsService()