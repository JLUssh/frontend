import { UserInfo } from "./interfaces";

export type state = {
  user: UserInfo | null;
  dispatch: React.Dispatch<Object> | undefined;
};
