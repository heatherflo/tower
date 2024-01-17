<template>
  <div class="container-fluid mt-3 ">
    <section class="row">

      <div class="col-12 mt-3"
        :style="{ backgroundImage: 'url(\'https://media.istockphoto.com/id/1457593188/photo/sunny-autumn-day-at-beautiful-mountain-lake.jpg?s=1024x1024&w=is&k=20&c=V_fNzR1iGDTNRcXmmBviF9aD_lGW6UenqbHZ70GLCko=\')', height: '50vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'top' }">
        <h3 class="text-light text-center text-align-center">real events</h3>
        <h3 class="text-light text-center text-align-center">real people</h3>
        <h3 class="text-light text-center text-align-center">real fun</h3>
      </div>



    </section>


  </div>
</template>

<script>
export default {
  setup() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.bg-image {
  height: 100vh;
  max-width: 1200px;
  object-fit: cover;
  object-position: center;
  background-repeat: no-repeat;
}
</style>
