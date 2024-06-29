import { Link, useNavigate } from "react-router-dom";
import mailIcon from "../assets/images/mail.svg";
import passwordIcon from "../assets/images/password.svg";
import { Button } from "./ui/button";
import Field from "./ui/Field";
import { useForm } from "react-hook-form";
import {
  LogInFormParams,
  emailValidation,
  passwordValidation,
} from "@/data/formOptions";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { logInUser } from "@/store/thunks/userThunks";

const LogInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormParams>();
  const dispatch = useTypeDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: LogInFormParams) => {
    dispatch(logInUser(data));
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <Field
          variant="icon"
          icon={mailIcon}
          type="email"
          placeholder="Email"
          errors={errors.email}
          {...register("email", emailValidation)}
        />
        <Field
          variant="icon"
          icon={passwordIcon}
          type="password"
          placeholder="Password"
          errors={errors.password}
          {...register("password", passwordValidation)}
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
        <Button className="text-background font-main font-medium text-md min-w-36 h-11 w-7/12 hover:shadow-primary-button transition-all duration-3 hover:-translate-y-[1px]">
          Log In
        </Button>
      </div>
    </form>
  );
};

export default LogInForm;
