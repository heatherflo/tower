<template>
  <div class="myEventsPage">
    <h4>This is my events page</h4>
    <!-- create event button -->
    <div class="container-fluid">
      <section class="row" v-if="account.id">
        <div class="col-12">

          <form @submit.prevent="createEvent()" class="">
            <div>
              <label for="name">Name of Event</label>
              <input required v-model="eventData.name" class="form-control" type="text" id="create-name" minlength="3"
                maxlength="30">
            </div>
            <div>
              <label for="type">Select Type of Event</label>
              <select required v-model="eventData.type" class="form-control">
                <!-- <option selected disabled value="">select a category</option> -->
                <option selected v-for="option in typeOptions" :value="option">{{ option }}</option>

              </select>
            </div>
            <div>
              <label for="date">When is it?</label>
              <input required v-model="eventData.startDate" class="form-control" minlength="3" maxlength="" type="text">
            </div>
            <div>
              <label for="capacity">How many people can attend?</label>
              <input required v-model="eventData.capacity" class="form=control w-100 mt-2" type="number" name="capacity"
                id="capacity" min="3" max="2000">
            </div>
            <div>
              <label for="location">Where will this event take place?</label>
              <input required class="form-control" v-model="eventData.location" type="text" minlength="">
            </div>
            <div>
              <label for="coverImg">Cover image</label>
              <input required v-model="eventData.coverImg" class="form-control " type="url" minlength="3" maxlength="500">
            </div>
            <div>
              <label for="description">Tell us about your event:</label>
              <textarea required v-model="eventData.description" name="description" id="create-description"
                class="form-control w-100" minlength="3" maxlength="1000" cols="30" rows="10"></textarea>
            </div>
            <div class="text-center mt-2">
              <button class="btn btn-info p-2 col-12">Create
                Event
                <i><i class="mdi mdi-plus"></i></i></button>

            </div>
          </form>
        </div>
      </section>
      <section v-else>
        Please log in to create an event
      </section>
    </div>

    <!-- my events I have created -->
    <section class="row">
      <div class="col-12">
        <h4>My Events</h4>
      </div>
      <div class=" col-12 col-md-3 myEvents" v-for="myEvent in myEvents">
        <MyEventsCard :myEvent="myEvent" :key="myEvent" />

      </div>

    </section>

    <!-- events I am attending/my tickets  -->
    <section class="row">
      <div class="col-12 col-md-4">
        <h3 class="ms-3">Upcoming Events</h3>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from '../AppState';
import MyEventsCard from '../components/MyEventsCard.vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';



export default {
  setup() {
    const eventData = ref({})
    const route = useRoute()
    const router = useRouter()
    return {
      typeOptions: ['sport', 'concert', 'convention', 'digital'],
      route,
      eventData,
      events: computed(() => AppState.events),
      myEvents: computed(() => AppState.myEvents),
      account: computed(() => AppState.account),
      // async getMyEvents() {
      //   try {
      //     await eventsService.getMyEvents()
      //   } catch (error) {
      //     Pop.error(error)
      //   }
      // }

      async createEvent() {
        // TODO check again for the eventId and why it is coming up as undefined
        try {
          console.log('eventData', eventData.value)
          await eventsService.createEvent(eventData.value)
          Pop.success('event created')
          eventData.value = {}
          router.push({ name: 'Event Details', params: { eventId: event.id } })
          console.log('eventId', eventId)
        } catch (error) {
          Pop.error(error)
        }
      }
    }

  },
  components: { MyEventsCard }
}
</script>
