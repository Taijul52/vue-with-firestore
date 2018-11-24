<template>
    <div id="edit-employee">
      <h2>Edit Teacher Profile</h2>
      <div class="row">
          <form class="col s12" @submit.prevent="updateTeacher">
              <!-- <div class="row">
                <div class="input-field col s12">
                  <input  v-model="teacher_id" type="text"  disabled>
                 <label for="" class="active">Your Id:</label>
                  </div>
                </div> -->
              
                <div class="input-field col s12">
                  <label for="" class="active">Your Name:</label>
                  <input  type="text" required v-model="name">
                 
                </div>
              
              
                <div class="input-field col s12">
                   <label for="" class="active">Your Department:</label>
                  <input  type="text"  v-model="dept">
                 
                </div>
              
                <div class="input-field col s12">
                   <label for="" class="active">Your Designation:</label>
                  <input  type="text"  v-model="designation">
                 
                </div>
              
                <div class="input-field col s12">
                   <label for="" class="active">Your Email:</label>
                  <input  type="email"  v-model="email">
                 
                </div>
              
                <div class="input-field col s12">
                   <label for="" class="active">Remarks:</label>
                  <input  type="text"  v-model="remarks">
                 
                </div>
             
            <button type="submit" class="btn btn-green">Update</button>
            <router-link to="/" class="btn cyan">Cancel</router-link>
        </form>
       </div>
    </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "edit-teacher",
  data() {
    return {
      teacher_id: null,
      name: null,
      dept: null,
      designation: null,
      email: null,
      remarks: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("teachers")
      .where("teacher_id", "==", to.params.teacher_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            (vm.teacher_id = doc.data().teacher_id),
              (vm.name = doc.data().name),
              (vm.dept = doc.data().dept),
              (vm.designation = doc.data().designation),
              (vm.email = doc.data().email),
              (vm.remarks = doc.data().remarks);
          });
        });
      });
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      db.collection("teachers")
        .where("teacher_id", "== ", this.$route.params.teacher_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            (this.teacher_id = doc.data().teacher_id),
              (this.name = doc.data().name),
              (this.dept = doc.data().dept),
              (this.designation = doc.data().designation),
              (this.email = doc.data().email),
              (this.remarks = doc.data().remarks);
          });
        });
    },
    updateTeacher() {
      db.collection("teachers")
        .where("teacher_id", " == ", this.$route.params.teacher_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref
              .update({
                teacher_id: this.teacher_id,
                name: this.name,
                dept: this.dept,
                designation: this.designation,
                email: this.email,
                remarks: this.remarks
              })
              .then(() => {
                this.$router.push({
                  name: "view-teacher",
                  params: { teacher_id: this.teacher_id }
                });
              });
          });
        });
    }
  }
};
</script>