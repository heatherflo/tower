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
              <input class="form-control" type="text" id="name">
            </div>
            <div>
              <label for="type">Select Type of Event</label>
              <select class="form-control" type="dropdown">
                <option value="option1">--select--</option>
                <option value="option2">concert</option>
                <option value="option3">convention</option>
                <option value="option4">sport</option>
                <option value="option5">digital</option>

              </select>
            </div>
            <div>
              <label for="date">When is it?</label>
              <input class="form-control" type="text">
            </div>
            <div>
              <label for="coverImg">Cover image</label>
              <input class="form-control" type="url">
            </div>
            <div class="text-center mt-2">
              <button class="btn btn-info p-2 col-12">Create
                Event
                <i><i class="mdi mdi-plus"></i></i></button>

            </div>
          </form>
        </div>
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
import { computed } from 'vue';
import { AppState } from '../AppState';
import MyEventsCard from '../components/MyEventsCard.vue';
import Pop from '../utils/Pop';
import { eventsService } from '../services/EventsService';
import { useRoute } from 'vue-router';



export default {
  setup() {
    const route = useRoute()
    return {
      route,
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
        try {
          const eventData = { creatorId: route.params.creatorId }
          await eventsService.createEvent(eventData)

        } catch (error) {
          Pop.error(error)
        }
      }
    }

  },
  components: { MyEventsCard }
}
</script>
