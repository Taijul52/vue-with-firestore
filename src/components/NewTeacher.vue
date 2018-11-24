<template>
    <div id="new-employee">
      <h2>Add New Teacher</h2>
       <div class="row">
          <form class="col s12" @submit.prevent="saveTeacher">
              <div class="row">
                <div class="input-field col s12">
                  <input  v-model="teacher_id" type="text" required>
                  <label >Teacher ID:</label>
                  </div>
                </div>
              <div class="row">
                <div class="input-field col s12">
                  <input  type="text" required v-model="name">
                  <label >Name:</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input  type="text" class="validate" v-model="dept">
                  <label >Department:</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input  type="text" class="validate" v-model="designation">
                  <label >Designation:</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input  type="email" class="validate" v-model="email">
                  <label >Email:</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <input  type="text" class="validate" v-model="remarks">
                  <label >Remarks:</label>
                </div>
              </div>
            <button type="submit" class="btn btn-green">Add</button>
            <router-link to="/" class="btn cyan">Cancel</router-link>
        </form>
       </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "new-teacher",
  data() {
    return {
      employee_id: null,
      name: null,
      dept: null,
      designation: null,
      email: null,
      remarks: null
    };
  },
  methods: {
    saveTeacher() {
      db.collection("teachers")
        .add({
          teacher_id: this.teacher_id,
          name: this.name,
          dept: this.dept,
          designation: this.designation,
          email: this.email,
          remarks: this.remarks
        })
        .then(docRef => {
          this.$router.push("/");
        })
        .catch(error => console.log(err));
    }
  }
};
</script>