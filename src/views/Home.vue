<template>
  <div>
    <start class="mb-1" />
    <router-link title="Create new card" class="btn-router" to="/create">
      <svg class="svg-icon svg-3" aria-hidden="true" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1C5.9 1 1 5.9 1 12s4.9 11 11 11 11-4.9 11-11S18.1 1 12 1zm5 13h-3v3c0 1.1-.9 2-2 2s-2-.9-2-2v-3H7c-1.1 0-2-.9-2-2s.9-2 2-2h3V7c0-1.1.9-2 2-2s2 .9 2 2v3h3c1.1 0 2 .9 2 2s-.9 2-2 2z"/></svg>
    </router-link>
  </div>
</template>

<script>
import Start from "@/components/Start.vue";

export default {
  name: "home",
  components: {
    Start
  }
};
</script>
<style scoped>
  .svg-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    fill: #2c3e50;
  }
  .svg-3 {
    font-size: 3rem;
  } 
  .mb-1{
    margin-bottom: 1rem;
  }
</style>

