<template>
  <div class="myEvents">
    {{ }}

  </div>
</template>


<script>



export default {
  props: { type: Event, required: true },
  setup() {
    return {
      myEvents: computed(() => AppState.myEvents)
    }
  }
};
</script>


<style lang="scss" scoped></style>