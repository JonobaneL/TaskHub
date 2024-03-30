import { Input } from "@/components/ui/input";
import mailIcon from "../assets/images/mail.svg";
import passwordIcon from "../assets/images/password.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LogInPage = () => {
  //split component
  return (
    <section className="h-dvh bg-cover bg-center flex items-center justify-center bg-back-img">
      {/* find better shadow */}
      <div className="max-w-md border shadow-md rounded py-12 px-7 bg-background">
        <div>
          <h3 className="text-primary font-semibold text-4xl leading-11 font-main text-center">
            Log In
          </h3>
          <h4 className="text-gray/800 text-sm text-center font-main font-medium mt-5">
            Ready to get back to work? Sign in to TaskHub and stay on top of
            your tasks with ease!
          </h4>
        </div>
        <div className="mt-7 space-y-4">
          <div className="relative">
            <img
              src={mailIcon}
              alt="email"
              className="absolute inset-y-1/2 -translate-y-1/2 left-2"
            />
            <Input
              type="email"
              placeholder="Email"
              className="focus:ring-1 focus-visible:ring-primary h-10 pl-9"
            />
          </div>
          <div className="relative">
            <img
              src={passwordIcon}
              alt="password"
              className="absolute inset-y-1/2 -translate-y-1/2 left-2"
            />
            <Input
              type="password"
              placeholder="Password"
              className="focus:ring-1 focus-visible:ring-primary h-10 pl-9"
            />
          </div>
        </div>
        <div className="text-right my-3">
          <Link
            to="/forgot-password"
            className="text-primary font-main font-medium text-xs"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="flex items-center mt-10 flex-col gap-5">
          <Button className="text-background font-main font-semibold min-w-36 h-10 w-7/12">
            Log In
          </Button>
          <span className="text-sm font-main font-medium text-text">
            Don’t have an account?{" "}
            <Link className="text-primary font-main underline" to="/sign-up">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
};

export default LogInPage;
