import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"

class EventsService {

  async getAllEvents() {
    const response = api.get('api/events')
    // TODO Coming back as empty array even though I am getting an array of objects in the response payload
    logger.log('getting events from service', response.data)
    // AppState.events = response.data.map(event => newEvent(event))
  }

}

export const eventsService = new EventsService()