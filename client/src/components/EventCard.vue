<template>
  <div class="EventCard">
    {{ events }}

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';

export default {
  props: { event: { type: Event, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped></style>