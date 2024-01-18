import { api } from "./AxiosService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { Event } from "../models/Event"


class EventsService {

  async getAllEvents() {
    const response = await api.get('api/events')
    logger.log('getting events from service', response.data)
    AppState.events = response.data.map(event => new Event(event))
  }

  async createEvent(eventData) {
    AppState.activeEvent = null
    const response = await api.get(`api/events`, eventData)
    logger.log('creating event', response.data)
    const newEvent = new Event(response.data)
    AppState.events.push(newEvent)
    // TODO ask why we are returning newAlbum or newEvent here
    return newEvent //return album so the form can recognize the data
  }
  async getEventById(eventId) {
    const response = await api.get(`api/events/${eventId}`)
    logger.log('getting event by Id', response.data)
    AppState.activeEvent = new Event(response.data)
  }

  // async getMyEvents(){
  //   const response = await api.get()
  // }

}

export const eventsService = new EventsService()