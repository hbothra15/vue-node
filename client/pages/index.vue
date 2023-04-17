<template>
  <div class="home-page">
    <aside class="employee-list">
      <Card
        class="employee-chips"
        v-for="employee in employeesStore.employees"
        :key="employee.id"
        :emp="employee"
      />
    </aside>

    <main class="employee-details">
      <EmployeeDetails :emp="employeesStore.currentEmployee" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useEmployeeData } from '~/stores/employee_data_store';

const employeesStore = useEmployeeData();

onBeforeMount (() => {
  employeesStore.populateAllEmployee();
});
</script>

<script lang="ts">
import Card from '~/components/Card';
import EmployeeDetails from '~/components/EmployeeDetails';

export default {
  components: [Card, EmployeeDetails],
};
</script>

<style scoped>
div.home-page {
  display: grid;
  grid-template-columns: 2fr 3fr;
  padding: 1rem;
  gap: 1rem;
}

aside.employee-list {
  height: 100vh;
  overflow: scroll;
}
</style>
