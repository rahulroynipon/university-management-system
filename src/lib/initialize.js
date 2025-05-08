import GenerateAvatarUrl from "./GenerateAvatarUrl";

const initializeAdmin = async () => {
  const avatarURL = await GenerateAvatarUrl(process.env.ADMIN_NAME);
  return {
    role: "admin",
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    avatar: { url: avatarURL },
  };
};

export { initializeAdmin };
