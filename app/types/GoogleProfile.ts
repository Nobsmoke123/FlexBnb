import { Profile } from "next-auth";

export interface ExtendedProfile extends Profile {
  picture?: string;
}
