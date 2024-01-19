import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";


export class TicketsController extends BaseController {
  constructor() {
    super('api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.buyTicket)
  }
  async buyTicket(request, response, next) {
    try {
      const ticketData = request.body
      // TODO figure out this line - postman not liking the .id - can't use creatorId as that is not a property in the ticket Schema 
      ticketData.accountId = request.userInfo.id
      const ticket = await ticketsService.buyTicket(ticketData)
      response.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}