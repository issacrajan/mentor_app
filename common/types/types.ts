import { AdmissionCategory, Gender, StudentAccommodation } from '../enums';

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

export type UserType = {
  loginId?: string;
  loginPwd?: string;
  userType?: string;
  userName?: string;
  userStatus?: string;
};
export type StudentInfoType = {
  id?: string;
  userId?: string;
  userPwd?: string;
  userConfirmPwd?: string;
  fullName?: string;
  usn?: string;
  studentDOB?: string;
  studentGender?: Gender;
  studentRank?: number;
  admissionCategory?: AdmissionCategory;
  accommodation?: StudentAccommodation;
  mobileNumber?: string;
  emailId?: string;
  bloodGroup?: string;
  createdTs?: Date;
  updatedTs?: Date;
};

export type StudentParentType = {
  id?: string;
  studentRecordId?: string;
  fatherName?: string;
  motherName?: string;
  occupation?: string;
  currentAddress?: string;
  mobileNumber?: string;
  emailId?: string;
  createdTs?: Date;
  updatedTs?: Date;
};

export type StudentGuardianType = {
  id?: string;
  studentRecordId?: string;
  guardianName?: string;
  occupation?: string;
  currentAddress?: string;
  mobileNumber?: string;
  emailId?: string;
  createdTs?: Date;
  updatedTs?: Date;
};
