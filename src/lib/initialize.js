const initializeAdmin = () => {
  return {
    role: "admin",
    name: process.env.ADMIN_NAME,
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };
};

export { initializeAdmin };
