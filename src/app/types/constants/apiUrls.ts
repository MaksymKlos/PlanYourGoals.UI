import { environment } from "../../../environments/environment.development";

export const apiURLs = {
  //Authentication
  register: `${environment.apiUrl}/Authentication/Register`,
  login: `${environment.apiUrl}/Authentication/Login`,

  //PlanningProject
  planningProject: `${environment.apiUrl}/PlanningProject`,
  planningProjectWithId: (id: string) => `${environment.apiUrl}/PlanningProject/${id}`,

  //TaskGroup
  taskGroup: `${environment.apiUrl}/TaskGroup`,
  taskGroupWithId: (id: string) => `${environment.apiUrl}/TaskGroup/${id}`,

  //Task
  task: `${environment.apiUrl}/Task`,
  taskWithId: (id: string) => `${environment.apiUrl}/Task/${id}`,

  //User
  user: `${environment.apiUrl}/User`,

  //Achievement
  achievement: `${environment.apiUrl}/Achievements`,

  //Email
  email: `${environment.apiUrl}/Email`,

  //Bot
  bot: `${environment.apiUrl}/Bot`
}
