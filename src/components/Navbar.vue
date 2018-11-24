<template>
    <div id="navbar">
         <nav>
          <div class="nav-wrapper">
            <div class="container">
            <router-link to="/" class="brand-logo">Teachers to-do App</router-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              <li v-if="isLoggedIn"><span class="gray-text">{{currentUser}}</span></li>
              <li v-if="isLoggedIn"><router-link to="/" >Home</router-link></li>
              <li v-if="!isLoggedIn"><router-link to="/register" >Regsiter</router-link></li>
              <li v-if="!isLoggedIn"><router-link to="/login" >Login</router-link></li>
              <li v-if="isLoggedIn"><button class="btn black" v-on:click="logout">Logout</button></li>
            </ul>
          </div>
          </div>
        </nav>
        </div>
    
</template>

<script>
import firebase from "firebase";
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
    if (firebase.auth().currentUser) {
      (this.isLoggedIn = true),
        (this.currentUser = firebase.auth().currentUser.email);
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>