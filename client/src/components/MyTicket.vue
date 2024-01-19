<template>
  <div class="MyTicket container">

    <img class="profile-pic" :src="ticket.profile.picture" alt="">
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Ticket } from '../models/Ticket';
export default {
  props: { ticket: { type: Ticket, required: true } },

  setup() {

    return {
      tickets: computed(() => AppState.tickets)
    }
  }
};
</script>


<style lang="scss" scoped>
.profile-pic {
  height: 70px;
  width: 70px;
  border-radius: 50%;
}
</style>