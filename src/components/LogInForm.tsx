import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import mailIcon from "../assets/images/mail.svg";
import passwordIcon from "../assets/images/password.svg";
import { Button } from "./ui/button";
import Field from "./ui/Field";

const LogInForm = () => {
  return (
    <form>
      <div className="space-y-4">
        <Field
          variant="icon"
          icon={mailIcon}
          alt="email"
          type="email"
          placeholder="Email"
        />
        <Field
          variant="icon"
          icon={passwordIcon}
          alt="password"
          type="password"
          placeholder="Password"
        />
      </div>

      <div className="text-right my-3">
        <Link
          to="/forgot-password"
          className="text-primary font-main font-medium text-xs"
        >
          Forgot Password?
        </Link>
      </div>
      <div className="flex justify-center mt-8">
        <Button className="text-background font-main font-medium text-md min-w-36 h-11 w-7/12 hover:shadow-primary-button transition duration-1 hover:translate-y-[-1px]">
          Log In
        </Button>
      </div>
    </form>
  );
};

export default LogInForm;
