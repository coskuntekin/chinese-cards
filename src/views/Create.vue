<template>
  <div>
    <h1>
      Create Card
    </h1>
    <form class="form-layout mb-1" @submit="submit" role="form">
      <div class="form-group">
        <label class="form-label" for="hanzi">
          <small>
            Hanzi
          </small>
        </label>
        <input type="text" v-model="word.hanzi" value="" autofocus autocomplete="off" class="form-input" name="hanzi" id="hanzi" placeholder="Hanzi" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="definition">
          <small>
            Definition
          </small>
        </label>
        <textarea class="form-input" v-model="word.definition" name="definition" id="definition" cols="30" rows="10" placeholder="Definition" required></textarea>
      </div>
      <div class="form-group">
        <label class="form-label" for="pinyinToneSpace">
          <small>
            Pinyin Tone Space
          </small>
        </label>
        <input type="text" v-model="word.pinyinToneSpace" value="" autocomplete="off" class="form-input" name="pinyinToneSpace" id="pinyinToneSpace" placeholder="Pinyin Tone Space" required>
      </div>
      <button class="btn btn-large" v-bind:disabled="loading" type="submit">
        <span v-if="!loading">
          CREATE
        </span>
        <span v-if="loading">
          CREATE ...
        </span>
      </button>
    </form>
    <router-link title="Back to home" class="btn-router" to="/">
      <svg class="svg-icon svg-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 10c-2.3-.2-10 0-10 0V6c0-.8-.8-1.3-1.4-.8l-6.3 6c-.5.4-.5 1.2 0 1.6l6.3 6c.6.5 1.4 0 1.4-.8v-4s7.6.2 10 0c1.1-.1 2-.9 2-2s-.9-1.9-2-2z"/></svg>
    </router-link>
  </div>
</template>
<script>
  export default {
    name: "Create",
    data() {
      return {
        word: {
          hanzi: null,
          definition: null,
          pinyinToneSpace: null
        },
        length: [],
        errors: [],
        success: false,
        loading: false, 
      };
    },    
    props:{
    },
    created(){
      this.getWordsLength();
    },
    methods: {
      getWordsLength() {
        const url = "http://localhost:8090/chineseCards";
        fetch(url)
          .then(response => {
            if (response.ok) return response.json();
          })
          .then(data => {
            if (data.success) this.length = data.result.length;
          })
          .catch(error => {
            console.error(`Upps ${error} went wrong!`);
          });
      },      
      postWord(url = ``, data = {}) {
        return fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json());
      },
      submit(e) {
        this.loading = true;
        e.preventDefault();        
        this.postWord('http://localhost:8090/chineseCard', this.word)
          .then((data) => {
            this.loading = false;
             if (data.success) this.$router.push('/detail/' + this.length);
          });
      }      
    }
  };
</script>
<style scoped>
.form-layout{
  display: block;
  width: 100%;
  text-align: center;
}
.form-group{
  display: grid;
  width: 100%;
  grid-template-columns: minmax(min-content, auto), 1fr;
  align-items: center;
  grid-gap: 0.5rem;
  margin-bottom: 0.75rem;
  text-align: left;
}
.form-label{
  display: inline-block;
  text-align: right;
}
.form-input{
  padding: 1rem 0.5rem;
  border: 1px solid #e4e4e4;
  border-radius: 0.15rem;
  font-family: inherit;
  resize: vertical;
}
.btn{
  display: block;
  width: 100%;
  padding: 1rem 0.25rem;
  border-color: transparent;
  background-color: #2196f3;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
}
.btn[disabled]{
  opacity: 0.5;
}
.mb-1{
  margin-bottom: 1rem;
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

