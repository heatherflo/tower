import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { Event } from "../models/Event.js"


class EventsService {

  async getAllEvents() {
    const response = await api.get('api/events')
    logger.log('getting events from service', response.data)
    AppState.events = response.data.map(event => new Event(event))
  }

}

export const eventsService = new EventsService()