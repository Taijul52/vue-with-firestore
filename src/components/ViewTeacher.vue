<template>
    <div id="view-teacher">
             <ul class="collection with-header">
        <li class="collection-header"><h4>{{name}}</h4></li>
        <li class="collection-item">Teacher#id: {{teacher_id}}</li>
        <li class="collection-item">Designation: {{designation}}</li>
        <li class="collection-item">Department: {{dept}}</li>
        <li class="collection-item">Email: {{email}}</li>
        <li class="collection-item">Remarks: {{remarks}}</li>
        
      </ul>
      <router-link to="/" class="btn green">Back</router-link>
      <button @click="deleteTeacher" class="btn red">Delete</button>
      <div class="fixed-action-btn">
        <router-link :to="{name:'edit-teacher',params:{teacher_id:teacher_id}}" class="btn-floating btn-large  red">
        <i class="fa fa-pen"></i>
        </router-link>
      </div>
    </div>
</template>

<script>
import db from "./firebaseInit";
import { functions } from "firebase";
export default {
  name: "view-teacher",
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
    deleteTeacher() {
      if (confirm("Are you sure")) {
        db.collection("teachers")
          .where("teacher_id", "==", this.$route.params.teacher_id)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    }
  }
};
</script>