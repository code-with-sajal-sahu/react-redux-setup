export interface IUserProfile {
  _id: string;
  fullName: string;
  email: string;
  mobileNo: string;
  bio: string;
  dob: string;
  designation: string;
  address: string;
  createdAt: string;
}
export interface IAuthState {
  user: IUserProfile | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: unknown;
}
