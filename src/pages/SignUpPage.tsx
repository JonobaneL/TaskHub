import SignUpForm from "@/components/SignUpForm";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/header/taskhub.svg";

const SignUpPage = () => {
  const navigate = useNavigate();
  return (
    <section className="min-h-dvh bg-cover bg-center flex items-center justify-center bg-back-img py-10">
      <div className="max-w-md border shadow-form-shadow rounded py-12 px-7 bg-background">
        <div className="mb-7">
          <img
            onClick={() => navigate("/")}
            src={logo}
            className="w-1/3 block mx-auto cursor-pointer"
            alt="logo"
          />
          <h4 className="text-gray/800 text-sm text-center font-main font-medium mt-5">
            Join TaskHub today and streamline your team's task management
            process. Sign up now to get started!
          </h4>
        </div>
        <SignUpForm />
        <div className="text-sm font-main font-medium text-text text-center mt-5">
          Already have an account?{" "}
          <Link className="text-primary font-main underline" to="/log-in">
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
