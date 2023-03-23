import { getAccessToken } from './localStorage';
import { env_var } from '../config/env';

export interface AuthPayload {
    username: string;
    password: string;
  }
  
  export const authenticate = async (data: AuthPayload) => {
    if (data.username === "admin" && data.password === "Admin@123") {
      return {
        username: "admin",
        name: "Admin",
        role: "admin",
        permissions: []
    }
    } else if (data.username === "user" && data.password === "User@123") {
      return {
          username: "user",
          name: "Regular User",
          role: "regular-user",
          permissions: ["view-users"]
      } } else {
      return { status: false , data: "Something went wrong"};
    }
  };
  
  export const isAuthenticated = (): boolean => {
    return getAccessToken() ? true : false;
  };