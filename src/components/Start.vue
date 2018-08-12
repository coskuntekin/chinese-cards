<template>
  <div>
    <h1>
      HSK III
    </h1>
    <h2>
      三百汉子
    </h2>
    <router-link class="btn-router" to="/detail">
      Let's Start 
    </router-link>
  </div>
</template>
<script>
export default {
  name: "Start"
};
</script>
<style scoped>
.btn-router {
  display: inline-block;
  padding: 1.35rem 5.25rem;
  background-color: #03A9F4;
  color: #fff;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: box-shadow .2s ease-out;
}
.btn-router:hover{
  box-shadow: 0 5px 5px #e4e4e4;
  transition: box-shadow .2s ease-in;
}
</style>

