<template>
    <div id="dashboard">
        <ul class="collection with-header">
        <li class="collection-header"><h4>Teachers List</h4></li>
        <li v-for="(teacher,index) in teachers" :key="index"  class="collection-item">
          <div class="chip">{{teacher.dept}}</div>{{teacher.teacher_id}}:{{teacher.name}}
          <router-link v-bind:to="{name:'view-teacher',
          params:{teacher_id:teacher.teacher_id}}" class="secondary-content">
            <i class="fa fa-eye"></i>
          </router-link>
          
          </li>
        
      </ul>
      <div class="fixed-action-btn">
        <router-link to="/new" class="btn-floating btn-large  red">
        <i class="fa fa-plus"></i>
        </router-link>
      </div>
    </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "home",
  data() {
    return {
      teachers: []
    };
  },
  created() {
    db.collection("teachers")
      .orderBy("dept")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            teacher_id: doc.data().teacher_id,
            name: doc.data().name,
            dept: doc.data().dept,
            designation: doc.data().designation,
            email: doc.data().email,
            remarks: doc.data().remarks
          };
          this.teachers.push(data);
        });
      });
  }
};
</script>