<template>
  <div>
    <div class="container">
     <div id="register-page" class="row">
      <div class="col s5 z-depth-3 card blue-grey darken-3 offset-m2">
        <form class="register-form card-content white-text">
          <div class="row">
            <div class="input-field col s7 center">
              
              <h5 class="register-form-text">Register</h5>
            </div>
          </div>
          <div class="row margin">
            <div class="input-field col s12 white-text">
              <i class="material-icons prefix">email</i>
              <input id="email" type="email" v-model="email">
              <label for="email" class="center-align">Email</label>
            </div>
          </div>
          <div class="row margin">
            <div class="input-field col s12 white-text">
              <i class="material-icons prefix">lock</i>
              <input id="password" type="password" v-model="password">
              <label for="password">Password</label>
            </div>
          </div>
           <button type="submit" class="btn red center-align" v-on:click="register">Register</button>
        </form>
      </div>
      </div>
      </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`Account created for ${user.email}`);
            this.$router.go({ path: this.$router.path });
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
</style>
