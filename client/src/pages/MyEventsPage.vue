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

    <!-- events I am attending  -->
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';




export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },

}
</script>
