<template>
  <div>
    <div v-if="!loading && (!success || !words.length)">
      <h4>
        Upps something went wrong!
      </h4>
    </div>
    <div v-if="loading">
      <h4>
        loading ....
      </h4>
    </div>
    <cards v-if="words.length" v-bind:list-data="words"/>
    <router-link title="Back to home" class="btn-router" to="/">
      <svg class="svg-icon svg-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c-2.3-.2-10 0-10 0V6c0-.8-.8-1.3-1.4-.8l-6.3 6c-.5.4-.5 1.2 0 1.6l6.3 6c.6.5 1.4 0 1.4-.8v-4s7.6.2 10 0c1.1-.1 2-.9 2-2s-.9-1.9-2-2z"/></svg>
    </router-link>
  </div>
</template>
<script>
import Cards from "@/components/Cards.vue";

export default {
  name: "detail",
  components: {
    Cards
  },
  data() {
    return {
      success: true,
      loading: true,
      words: [],
      images: []
    };
  },
  created() {
    this.fetchWords();
  },
  methods: {
    async fetchWords() {
      const url = "http://localhost:8090/chineseCards";
      await fetch(url)
        .then(response => {
          if (response.ok) return response.json();
        })
        .then(data => {
          if (data.success) {
            this.loading = false;
            this.words = data.result;
          }else {
            this.success = false;
          }
        })
        .catch(error => {
          console.error(`Upps ${error} went wrong!`);
        });
    }
  }
};
</script>
<style scoped>
  .btn-router{
    display: block;
    width: 100%;
    padding-top: 0.5rem;
    border-top: 1px solid #eaeaea;
  }
  .svg-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    fill: #2c3e50;
  }
  .svg-3 {
    font-size: 3rem;
  }
</style>

