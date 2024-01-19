<template>
  <RouterLink :to="{ path: `/eventDetails/${event.id}` }">
    <div class="EventCard card rounded border-dark border-2 selectable">

      <img :src="event.coverImg" :alt="event.name">
      <div class="p-2">
        {{ event.name }}

      </div>
    </div>

  </RouterLink>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Event } from '../models/Event'
import { RouterLink } from 'vue-router';

export default {
  props: { event: { type: Event, required: true } },
  setup() {
    return {};
  },
  components: { RouterLink }
};
</script>


<style lang="scss" scoped></style>