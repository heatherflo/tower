import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";

export class EventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllEvents)

      .use(Auth0Provider.getAuthorizedUserInfo)

      .post('', this.createEvent)
  }
  async getAllEvents(request, response, next) {
    try {
      const events = await eventsService.getAllEvents()
      response.send(events)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(request, response, next) {
    try {
      const eventData = request.body
      const userId = request.userInfo.id
      eventData.creatorId = userId
      const event = await eventsService.createEvent(eventData)
      response.send(event)
    } catch (error) {
      next(error)
    }
  }


}