export interface IUser {
    id: number;
    username: string;
    password: string;
    role:string
  }

export interface IUserState {
    list:IUser[];
}