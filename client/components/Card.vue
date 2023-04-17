<template>
  <details
    :class="{
      active: isSelected(),
      'hidden-dropdown': true,
    }"
    @click="() => employeesStore.updateCurrentEmployee(props.emp.id)"
  >
    <summary>
      <section class="card">
        <img
          class="profile-picture"
          :src="props.emp.profile_pic"
          :alt="`Profile Image for ${getFullName()}`"
        />

        <main>
          <h4 class="fullname">{{ getFullName() }}</h4>
          <small class="email">{{ props.emp.email }}</small>
        </main>
      </section>
    </summary>

    <aside class="nesting-part">
      <Card
        @click.stop="() => employeesStore.updateCurrentEmployee(subordinate.id)"
        v-for="subordinate in getSubordinates()"
        :emp="subordinate"
      />
    </aside>
  </details>
</template>

<script setup lang="ts">
import { useEmployeeData } from '~/stores/employee_data_store';

interface IEmployee {
  id: number;
  first_name: sting;
  last_name: sting;
  email: sting;
  username: sting;
  profile_pic: sting;
  gender: sting;
  street_address: sting;
  city: sting;
  manager_id: number;
  bio: sting;
}

const props = defineProps({
  emp: {
    type: Object as IEmployee,
    required: true,
  },
});

const getFullName = () => `${props.emp.first_name} ${props.emp.last_name}`;

const employeesStore = useEmployeeData();

const isSelected = () => employeesStore.currentEmployee?.id === props.emp.id;

const getSubordinates = () => employeesStore.getSubordinates(props.emp.id);
</script>

<script lang="ts">
export default {
  name: 'Card',
};
</script>

<style scoped>
.card {
  --icon-size: 4rem;
}

.active {
  background: #ddd;
  border: 1px solid #5a5a5a;
}

.nesting-part {
  padding-left: 1rem;
}

.card {
  cursor: pointer;
  gap: 1rem;
  padding: 0.75rem 1rem;
  display: inline-grid;
  background: #fafafa;
  align-items: center;
  border-radius: 0.25rem;
  justify-content: flex-start;
  grid-template-columns: auto 1fr;
  margin-bottom: 1rem;
}

.card img {
  aspect-ratio: 1;
  border-radius: 50%;
  width: var(--icon-size);
  height: var(--icon-size);
}

small {
  color: #3a3a3a;
}

details.hidden-dropdown summary::-webkit-details-marker {
  display: none;
}

.fullname {
  font-size: 18px;
  margin-bottom: 0.25rem;
}

.card:hover,
.card:focus {
  background-color: #eee;
}

.card:active {
  background-color: #ddd;
}
</style>
