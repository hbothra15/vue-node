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

    removeEmployee(id = null) {
      this.currentEmployee = null;

      this.emp = this.emp.filter((employee) => employee.id !== id);
    },

    getSubordinates(id = null) {
      return this.emp.filter((employee) => employee.manager_id === id);
    },

    update(empData) {
      const { id, first_name, last_name, emailId, bio } = empData;

      const employee = this.emp.find((employee) => employee.id === id);
      const employeeIdx = this.emp.indexOf(employee);

      this.emp[employeeIdx] = {
        ...employee,
        first_name,
        last_name,
        emailId,
        bio,
      };

      this.currentEmployee = this.emp[employeeIdx];
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmployeeData, import.meta.hot));
}
