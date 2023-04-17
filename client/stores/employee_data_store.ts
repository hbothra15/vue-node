import http from "~/http-common";

export const useEmployeeData = defineStore('employeeData', {
  state: () => ({
    emp: [],
    currentEmployee: null,
  }),

  getters: {
    employees: (state) => {
      return state.emp;
    },
  },

  actions: {
    async populateAllEmployee() {
      http.get("/").then((response: any) => {
        this.emp = response.data;
      });
    },
    updateCurrentEmployee(id = null) {
      this.currentEmployee = this.emp.find((employee) => employee.id === id);
    },

    async removeEmployee(id = null) {
      this.currentEmployee = null;
      const {status} = await http.delete(`/${id}`);
      if(status == 204) {
        await this.populateAllEmployee();
      }
    },

    getSubordinates(id = null) {
      return this.emp.filter((employee) => employee.manager_id === id);
    },

    async update(empData) {
      const { id, first_name, last_name, emailId, bio } = empData;
      const {status} = await http.put(`/${id}`, {first_name, last_name, emailId, bio});
      if(status == 200) {
        const employeeIndex = this.emp.findIndex(e => e.id === id);
        this.emp[employeeIndex] = {...this.emp[employeeIndex], first_name, last_name, emailId, bio}
        this.currentEmployee = this.emp[employeeIndex];
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmployeeData, import.meta.hot));
}
