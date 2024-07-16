-- CreateTable
CREATE TABLE "AppUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "loginId" TEXT NOT NULL,
    "loginPwd" TEXT NOT NULL,
    "userType" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userStatus" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
