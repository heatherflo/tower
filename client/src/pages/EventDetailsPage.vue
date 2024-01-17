<template>
  <div class="EventDetails">
    <section class="row">
      <div class="col-12 m-3">
        <h2>{{ activeEvent.name }}</h2>

      </div>
      <div class="col-6">
        <img class="img-fluid ps-3" :src="activeEvent.coverImg" :alt="activeEvent.name">
      </div>
      <div class="col-6 px-3">
        <div>
          <h2>What's happening?</h2>
        </div>
        <div>
          <p>{{ activeEvent.description }}</p>
        </div>
        <h5> {{ activeEvent.startDate }}</h5>
        <div class="d-flex flex-column me-3 justify-content-end">
          <h4 class="mt-3">{{ activeEvent.capacity }} spots left</h4>
          <button @click="buyTicket()" class="mt-2 p-3 btn btn-info">Buy Ticket <i><i class="mdi mdi-ticket"></i>
            </i></button>
        </div>
      </div>
      <section class="row">
        <!-- who is attending -->
      </section>
      <section class="row">
        <!-- comments -->
      </section>

    </section>

    <!-- {{ activeEvent }} -->
  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, ref, onMounted, watchEffect } from 'vue';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';

export default {
  setup() {
    const route = useRoute();
    watchEffect(() => {
      getEventById(),
        route.params.eventId
    })
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId)

      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      getEventById,
      route,
      activeEvent: computed(() => AppState.activeEvent),
      async buyTicket() {

      }
    }
  }
};
</script>


<style lang="scss" scoped></style>