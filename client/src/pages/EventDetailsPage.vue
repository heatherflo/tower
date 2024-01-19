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
        <!-- TODO make dent not pump our raw data -->
        <h5> {{ activeEvent.startDate = new Date().toLocaleDateString('en-US', {
          month: 'numeric', day: 'numeric', year: 'numeric'
        }) }}</h5>
        <div class="d-flex flex-column me-3 justify-content-end">
          <h4 class="mt-3">{{ activeEvent.capacity }} spots left</h4>
          <button @click="buyTicket()" class="mt-2 p-3 btn btn-info">Buy Ticket <i><i class="mdi mdi-ticket"></i>
            </i></button>
        </div>
      </div>
      <section class="row">
        <!-- who is attending the event -->
        <div class="col-10 d-flex justify-content-center profile-pic">

          {{ tickets }}


        </div>
      </section>
      <section class="row mt-5 justify-content-center">
        <!-- comments -->
        <div class="col-10 d-flex">
          <form @submit.prevent="createComment()" class="form-control">
            <div>
              <label for="comment">Comment on the event</label>
              <textarea v-model="commentData.body" class="w-100  form-control" name="comment" id="create-comment"
                rows="5"></textarea>
            </div>
            <div>
              <button class="btn btn-info text-end">submit</button>
            </div>
          </form>

        </div>
      </section>
      <section class="row">
        <div class="col-12">
          <h4 class="ms-3 mt-3">Comments</h4>
          <div v-for="comment in comments" class="mb-3">
            <CommentCard :comment="comment" :key="comment.id" />
          </div>
        </div>

      </section>

    </section>


  </div>
</template>


<script>
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { computed, ref, onMounted, watchEffect } from 'vue';
import { eventsService } from '../services/EventsService';
import Pop from '../utils/Pop';
import { commentsService } from '../services/CommentsService'
import CommentCard from '../components/CommentCard.vue';
import { ticketsService } from '../services/TicketsService'
import { accountService } from '../services/AccountService';

export default {
  setup() {
    const commentData = ref({});
    const route = useRoute();
    onMounted(() => {
      getEventComments()
    });

    watchEffect(() => {
      getEventById();
      route.params.eventId;
      // getOtherPeoplesEventTickets()

    });
    async function createComment() {
      commentData.value.eventId = route.params.eventId;
      console.log('comment value', commentData.value);
      await commentsService.createComment(commentData.value);
      Pop.success('comment made');
      commentData.value = {};
    };
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      }
      catch (error) {
        Pop.error(error);
      }
    };
    // async function getOtherPeoplesEventTickets() {
    //   try {
    //     await ticketsService.getOtherPeoplesEventTickets()
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }
    async function getEventComments() {
      try {
        await commentsService.getEventComments(route.params.eventId)

      } catch (error) {
        Pop.error(error)
      }
    }
    // TODO make cancel for events

    return {
      tickets: computed(() => AppState.tickets),
      getEventComments,
      // getOtherPeoplesEventTickets,
      createComment,
      getEventById,
      commentData,
      route,
      comments: computed(() => AppState.comments),
      activeEvent: computed(() => AppState.activeEvent),
      async buyTicket() {
        try {
          const ticketData = { eventId: route.params.eventId }
          await ticketsService.buyTicket(ticketData)
        } catch (error) {
          Pop.error(error)
        }
      },

    };
  },
  components: { CommentCard }
};
</script>


<style lang="scss" scoped>
.profile-pic {
  height: 70px;
  width: 70px;
  border-radius: 50%;
}
</style>