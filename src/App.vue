<template>
  <div id="app">
    <router-view/>
      <Footer />
  </div>

</template>

<script>
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Footer
  }
}
</script>

<style>
#app {

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
display: flex;
flex:1;
flex-direction: column;
}
.container{
  max-width: 920px;
}
@media (max-width: 900px){
.main-container{
  margin:0;
  padding:0;
}
}

.inner-container{
  max-width: 730px !important;
  margin: auto;
}
.body-container{
  max-width: 540px !important;
  margin: auto;
}

</style>
