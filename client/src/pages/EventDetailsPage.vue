<template>
  <div class="EventDetails">

    this is the event details page
    {{ activeEvent }}
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
      activeEvent: computed(() => AppState.activeEvent)

    }
  }
};
</script>


<style lang="scss" scoped></style>