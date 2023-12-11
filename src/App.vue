<template>
  <div>
    <NavbarComponent />
    <router-view></router-view>
  </div>
</template>

<script>
  import NavbarComponent from "./NavbarComponent.vue"
  export default {
    data(){ 
      return{
      
    }},
    components: {
      NavbarComponent
    },
    methods: {
      
    },
    computed: {

    },
    watch: {
   
    }
  }
</script>




<style>
#app {
  justify-content: center;
  /* Horizontal centering */
  
  /* Add margin around the content */
}
body{
  background-color: #fff;
  padding-bottom: 50px;
}
a{
  text-decoration: none !important;
}
</style>
