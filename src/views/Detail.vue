<template>
  <div>
    <cards v-bind:list-data="words" />  
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
      words: [],
      images: []
    };
  },
  created() {
    this.fetchWords();
  },
  methods: {   
    fetchWords() {
      const url = "data/hskthree.json";
      fetch(url)
        .then(response => {
          if (response.ok) return response.json();
        })
        .then(data => {
          this.words = data;
        })
        .catch(error => {
          console.error(`Upps ${error} went wrong!`);
        });
    }
  }
};
</script>
