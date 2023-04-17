<template>
  <section v-if="!props.emp" />

  <section class="employee-details" v-else>
    <div class="read-only" v-if="!state.isEditMode">
      <header>
        <img
          class="profile-picture"
          :src="props.emp.profile_pic"
          :alt="`Profile Image for ${getFullName()}`"
        />

        <main>
          <h1 class="fullname">{{ getFullName() }}</h1>
          <small class="email">{{ props.emp.email }}</small>
        </main>
      </header>

      <p class="bio">{{ props.emp.bio }}</p>
    </div>

    <div class="edit-mode" v-else>
      <header>
        <img
          class="profile-picture"
          :src="props.emp.profile_pic"
          :alt="`Profile Image for ${getFullName()}`"
        />

        <main>
          <input
            type="text"
            v-model="formData.first_name"
            placeholder="Enter First Name"
          />

          <input
            type="text"
            v-model="formData.last_name"
            placeholder="Enter Last Name"
          />
          <br />

          <input
            type="email"
            v-model="formData.emailId"
            placeholder="Enter Email"
          />
        </main>
      </header>

      <textarea
        style="width: 100%; min-height: 150px"
        v-model="formData.bio"
        type="text"
      />
    </div>

    <nav v-if="state.isEditMode">
      <button @click="updateInfo">Save</button>

      <button @click="state.isEditMode = false">Cancel</button>
    </nav>
    <nav v-else>
      <button @click="state.isEditMode = true">Edit</button>

      <button @click="() => employeesStore.removeEmployee(props.emp.id)">
        Delete
      </button>
    </nav>
  </section>
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

const state = reactive({
  isEditMode: false,
});

const formData = reactive({
  first_name: props.emp?.first_name,
  last_name: props.emp?.last_name,
  emailId: props.emp?.email,
  bio: props.emp?.bio,
});

watch(
  () => props.emp,
  (first, second) => {
    if (first?.id === second?.id) return;

    formData.first_name = props.emp?.first_name;
    formData.last_name = props.emp?.last_name;
    formData.emailId = props.emp?.email;
    formData.bio = props.emp?.bio;

    state.isEditMode = false;
  }
);

const updateInfo = () => {
  state.isEditMode = false;
  employeesStore.update({
    id: props.emp.id,
    first_name: formData.first_name,
    last_name: formData.last_name,
    emailId: formData.emailId,
    bio: formData.bio,
  });
};
</script>

<script lang="ts">
export default {
  name: 'EmployeeDetails',
};
</script>

<style scoped>
.employee-details {
  --icon-size: 4rem;
  background: #eee;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
}

section.employee-details header {
  gap: 1rem;
  display: grid;
  align-items: center;
  justify-content: flex-start;
  grid-template-columns: auto 1fr;
  margin-bottom: 1rem;
}

section.employee-details img {
  aspect-ratio: 1;
  border-radius: 50%;
  width: var(--icon-size);
  height: var(--icon-size);
}

small {
  color: #3a3a3a;
}

.fullname {
  margin-bottom: 0.25rem;
}

.bio {
  line-height: 1.5;
  color: #3a3a3a;
}

nav {
  gap: 1rem;
  display: flex;
  margin-block: 1rem;
}

button {
  padding: 0.75rem 1rem;
  border-radius: 4px;
}
</style>
