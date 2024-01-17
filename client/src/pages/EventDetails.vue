<template>
  <div class="EventDetails">


  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, ref, onMounted, watchEffect } from 'vue';
import { eventsService } from '../services/EventsService';
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
    }
  }
};
</script>


<style lang="scss" scoped></style>