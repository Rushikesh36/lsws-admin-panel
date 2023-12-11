<template>
  <nav class="navbar navbar-expand-lg navbar-light" >
    <router-link to="/">
      <img src="https://firebasestorage.googleapis.com/v0/b/wani-samaj.appspot.com/o/lsws-logo-new.png?alt=media&token=f7b19a63-2191-4b89-97e4-45c5fcd05da5" />
    </router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <router-link to="/addProfile">
          <li class="nav-item">
            <a class="nav-link" href="#">Add User</a>
          </li>
        </router-link>
        <router-link to="/delete">
          <li class="nav-item">
            <a class="nav-link" href="#">Delete User</a>
          </li>
        </router-link>
        <router-link to="/receiptApproval">
          <li class="nav-item">
            <a class="nav-link" href="#">Approve Receipts</a>
          </li>
        </router-link>
        <router-link to="/notifications">
          <li class="nav-item">
            <a class="nav-link" href="#">Send Notifications</a>
          </li>
        </router-link>
        <router-link to="/result">
          <li class="nav-item">
            <a class="nav-link" href="#">Show All Results</a>
          </li>
        </router-link>
        <router-link to="/upload/receipt">
          <li class="nav-item">
            <a class="nav-link" href="#">Add Receipt</a>
          </li>
        </router-link>
        <li class="nav-item">
            <a class="nav-link" href="https://drive.google.com/drive/folders/1akdxr_iDR-zN2HKBZ86tZo_OERSqzc59">Documents</a>
          </li>
        <li v-if="isAuthenticated" class="nav-item">
            <v-btn class="nav-link" color="red" @click="logout" href="#">Logout</v-btn>
          </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
      logout(){
        this.$store.dispatch('logout');
      }
    },
    computed:{
      isAuthenticated() {
        return this.$store.state.isAuthenticated;
      }
    }
  }
</script>

<style>
  .navbar{
    font-size: 1.3rem;
    font-weight: 500;
  }
  .navbar img{
  height: 80px;
  width: auto;
  padding-left: 2vh;
  padding-right: 5vh;
  }
  .navbar li{
    padding-right: 10px;
  }
  @media (min-width:786px) {
    #navbarNav{
      padding-right: 10vw;
    }
    .navbar-brand{
      padding-left: 10vw;
    }
    .navbar{
      height: 100px;
    }
  }
  .navbar img{
  height: 80px;
  width: auto;
  padding-left: 2vh;
  padding-right: 2vh;
}

</style>