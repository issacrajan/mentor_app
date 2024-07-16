export type UserInfoType = {
  userId?: string;
  userName?: string;
  roleName?: string;
  userEmail?: string;
  homePath?: string;
};

export type GlobalContent = {
  user: UserInfoType;
  setUser: (c: UserInfoType) => void;
};
