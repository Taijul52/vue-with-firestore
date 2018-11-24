<template>
  <div>
    <div class="container">
     <div id="login-page" class="row">
    <div class="col s5 z-depth-3 card blue-grey darken-4 offset-m2">
      <form class="login-form card-content white-text">
        <div class="row">
          <div class="input-field col s7 center">
            
            <h5 class=" login-form-text">Login</h5>
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">email</i>
            <input id="email" type="email" v-model="email">
            <label for="email" class="center-align">Email</label>
          </div>
        </div>
        <div class="row margin">
          <div class="input-field col s12">
            <i class="material-icons prefix">lock</i>
            <input id="password" type="password" v-model="password">
            <label for="password">Password</label>
          </div>
        </div>
       
        <button type="submit" class="btn red " v-on:click="login">Login</button>
              
      
      </form>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are login as ${user.email}`);
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
.formposition {
  margin: 50px auto;
}
</style>
