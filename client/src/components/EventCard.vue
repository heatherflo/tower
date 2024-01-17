<template>
  <div class="EventCard card rounded">
    <!-- {{ event.name }} -->
    <img :src="event.coverImg" :alt="event.name">
    {{ event.name }}
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Event } from '../models/Event'

export default {
  props: { event: { type: Event, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped></style>