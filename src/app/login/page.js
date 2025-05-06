import LoginForm from "./LoginForm";

export const metadata = {
  title: "Student Portal | City University",
  description:
    "Login to the City University student portal to access academic resources, manage your profile, and stay informed about university updates.",
  keywords: [
    "City University",
    "Student Portal",
    "Login",
    "Academic Resources",
    "University Profile",
    "University Login",
    "Education",
    "Campus Activities",
  ],
};

export default function Login() {
  return (
    <div className="width padding">
      <main className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold">Student Portal</h1>
        <p className="text-red-800 text-lg italic max-w-md text-center">
          Access your academic resources, manage your profile, and stay updated
          with university activities.
        </p>

        <LoginForm />
      </main>
    </div>
  );
}
