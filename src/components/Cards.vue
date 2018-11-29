<template>
  <div class="card">
    <h1>
      三百汉子
    </h1>
    <ul class="card-list">
      <li class="card-item" v-for="word in paginatedData" v-bind:key="word._id">
        <div class="grid-title">
          <div class="text-light">
            <h1>
              {{pageNumber}}
            </h1>
          </div>
          <div class="conteneditable">
            {{word.hanzi}}            
          </div>
          <button class="btn svg-2 no-padding text-light" title="What is mean?" type="button" @click="btnInfo(word.id,word.hanzi)">
            <svg aria-hidden="true" class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"></path>
            </svg>
          </button>
        </div>
        <div v-show="isInfo">
          <button class="btn text-light" @click="btnVoice(word.hanzi)" title="Listen" type="button">
            <svg aria-hidden="true" class="svg-icon svg-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M216 260c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-44.112 35.888-80 80-80s80 35.888 80 80c0 15.464-12.536 28-28 28s-28-12.536-28-28c0-13.234-10.767-24-24-24s-24 10.766-24 24zm24-176c-97.047 0-176 78.953-176 176 0 15.464 12.536 28 28 28s28-12.536 28-28c0-66.168 53.832-120 120-120s120 53.832 120 120c0 75.164-71.009 70.311-71.997 143.622L288 404c0 28.673-23.327 52-52 52-15.464 0-28 12.536-28 28s12.536 28 28 28c59.475 0 107.876-48.328 108-107.774.595-34.428 72-48.24 72-144.226 0-97.047-78.953-176-176-176zm-80 236c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zM32 448c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zm480-187.993c0-1.518-.012-3.025-.045-4.531C510.076 140.525 436.157 38.47 327.994 1.511c-14.633-4.998-30.549 2.809-35.55 17.442-5 14.633 2.81 30.549 17.442 35.55 85.906 29.354 144.61 110.513 146.077 201.953l.003.188c.026 1.118.033 2.236.033 3.363 0 15.464 12.536 28 28 28s28.001-12.536 28.001-28zM152.971 439.029l-80-80L39.03 392.97l80 80 33.941-33.941z"></path>
            </svg>
          </button>
          <p>
            {{word.pinyinToneSpace}}
          </p>
          <small>
            {{word.definition}}
          </small>
          <div class="padding-tb" aria-label="No images">
            <svg v-show="hasNoImage" title="Sorry! Seems like can't find image" aria-hidden="true" class="svg-icon svg-8" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path>
            </svg>
          </div>
          <div class="padding-tb" aria-label="Images">
            <span v-if="!word.image">
              <small>Image is loading ...</small>
            </span>
            <span v-if="word.image">
              <img v-show="!hasNoImage" class="img-responsive" v-bind:src="word.image" v-bind:alt="word.definition">
            </span>
          </div>
        </div>
        <button class="btn svg-3" type="button" aria-label="Prev page button" @click="prevPage()" @keyup.left="prevPage()" v-bind:disabled="pageNumber === 0">
          <svg aria-hidden="true" class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z"></path>
          </svg>
        </button>
        <button class="btn svg-3" type="button" aria-label="Next page button" @click="nextPage()" @keyup.right="nextPage()" v-bind:disabled="pageNumber >= pageCount -1">
          <svg aria-hidden="true" class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm-28.9 143.6l75.5 72.4H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h182.6l-75.5 72.4c-9.7 9.3-9.9 24.8-.4 34.3l11 10.9c9.4 9.4 24.6 9.4 33.9 0L404.3 273c9.4-9.4 9.4-24.6 0-33.9L271.6 106.3c-9.4-9.4-24.6-9.4-33.9 0l-11 10.9c-9.5 9.6-9.3 25.1.4 34.4z"></path></svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Cards",
    data() {
      return {
        images: [],
        hanzi: '',
        hasNoImage: false,
        isInfo: false,
        isImageChached: false,
        pageNumber: 0
      };
    },
    props: {
      listData: {
        type: Array,
        required: true
      },
      size: {
        type: Number,
        required: false,
        default: 1
      }
    },
    created () {
      this.pageNumber = this.$route.params.id;
    },
    methods: {
      async fetchImages(id, hanzi) {
        const apiKey = '9794611-562bab510159825d5b60544a1';
        const url = `https://pixabay.com/api/?key=${apiKey}&lang=zh&q=${hanzi}&image_type=photo&pretty=true&per_page=3`;
        await fetch(url)
          .then(response => {
            if (response.ok) return response.json();
          })
          .then(data => {
            this.images = data;
            this.injectImage(id, this.images.hits, this.listData);
          })
          .catch(error => {
            console.error(`Upps ${error} went wrong!`);
          });
      },
      btnVoice(hanzi) {
        if (responsiveVoice.voiceSupport()) responsiveVoice.speak(hanzi, 'Chinese Female');
      },
      btnInfoToggle() {
        this.isImageChached = false;
        if (this.isInfo === true) this.isInfo = false;
      },
      nextPage() {
        this.pageNumber++;
        this.$router.push('/detail/' + (this.pageNumber+1));
        this.btnInfoToggle();
      },
      prevPage() {
        this.pageNumber--;
        this.$router.push('/detail/' + (this.pageNumber+1));        
        this.btnInfoToggle();
      },
      btnInfo(id, hanzi) {
        this.isInfo ? this.isInfo = false : this.isInfo = true;
        if (!this.isImageChached) this.fetchImages(id, hanzi);
        this.isImageChached = true;
      },
      injectImage(id, images, words) {
        let image = '';
        if (images.length === 0) {
          this.hasNoImage = true;
        } else {
          image = images.shift().previewURL;
          words.forEach(element => {
            if (id === element.id) element.image = image;
          });
          this.hasNoImage = false;
        }
      }
    },
    computed: {
      pageCount() {
        const l = this.listData.length;
        const s = this.size;
        return Math.floor(l / s);
      },
      paginatedData() {
        const start = this.pageNumber * this.size;
        const end = start + this.size;
        return this.listData.slice(start, end);
      }
    }
  };
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
  }
  .btn {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    background-color: transparent;
    border: 1px solid transparent;
    vertical-align: middle;
    text-align: center;
  }
  .btn[disabled] {
    opacity: 0.5;
  }
  .no-padding {
    padding: 0;
  }
  .text-light {
    color: #adb5bd;
  }
  .grid-title {
    display: grid;
    grid-template-columns: 3rem 12rem 3rem;
    grid-template-rows: minmax(min-content, auto);
    grid-gap: 1rem;
    align-items: center;
  }
  hr {
    border-color: transparent transparent #adb5bd transparent;
  }
  .conteneditable {
    display: inline-block;
    width: 100%;
    font-size: 2rem;
    color: #2c3e50;
    text-align: center;
  }
  .svg-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    fill: #2c3e50;
  }
  .svg-2 {
    font-size: 2rem;
  }
  .svg-3 {
    font-size: 3rem;
  }
  .svg-8 {
    font-size: 8rem;
    color: #adb5bd;
  }
  .card-item {
    display: inline-block;
    width: 20rem;
    min-height: auto; 
    background-color: #fff; 
    padding: 2rem;
    border-radius: 0.25rem;
    border: 1px solid rgba(0, 0, 0, 0.125);
    box-shadow: 0px 20px 51px rgba(51, 71, 95, 0.2);
  }
  .img-responsive {
    max-width: 100%;
    height: 120px;
  }
  .padding-tb {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
</style>