<template>
  <div class="CommentCard">
    <img :src="comment.creator.picture" alt="">
    {{ comment.body }}

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Comment } from '../models/Comment'

export default {
  props: { comment: { type: Comment, required: true } },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped></style>