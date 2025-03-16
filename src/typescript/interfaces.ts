export interface baseUserInfo {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
}

export interface UserInfo {
  user: baseUserInfo | null;
}

export interface Action {
  type: string;
  payload: baseUserInfo | null;
}

export interface CTX extends UserInfo {
  dispatch: React.Dispatch<Action>;
  // setValue: Function;
}

export interface Post {
  id: number;
  photo: string;
  title: string;
  createdAt: string;
  desce: string;
}
