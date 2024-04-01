import mailIcon from "../assets/images/mail.svg";
// import passwordIcon from "../assets/images/password.svg";
import Field from "./ui/Field";
import PasswordField from "./ui/PasswordField";
import { Button } from "./ui/button";
import { useForm, Controller } from "react-hook-form";

type SingUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const { control, register, handleSubmit } = useForm<SingUpForm>();
  const onSubmit = (data: SingUpForm) => console.log(data);
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4">
        {/* maybe change flex direcition on smaller screens */}

        <Field
          variant="standart"
          placeholder="First Name"
          {...register("firstName")}
        />
        <Field
          variant="standart"
          placeholder="Last Name"
          {...register("lastName")}
        />
      </div>
      <Field
        type="email"
        variant="icon"
        icon={mailIcon}
        alt="email"
        placeholder="Email"
        {...register("email")}
      />
      <PasswordField placeholder="Password" {...register("password")} />
      <PasswordField
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      <div className="flex justify-center pt-4">
        <Button className="text-background font-main font-medium text-md min-w-36 h-11 w-7/12 hover:shadow-primary-button transition duration-1 hover:translate-y-[-1px]">
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
