import {
  SingUpFormParams,
  emailValidation,
  fieldValidation,
  passwordValidation,
} from "@/data/formOptions";
import mailIcon from "../assets/images/mail.svg";
import Field from "./ui/Field";
import PasswordField from "./ui/PasswordField";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { useTypeDispatch } from "@/hooks/useReduxHooks";
import { signUpUser } from "@/store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { passwordConfirmValidation } from "@/utils/formValidations";
import FileField from "./ui/FileField";
import { LuImagePlus } from "react-icons/lu";
import { useState } from "react";

const SignUpForm = () => {
  const [img, setImg] = useState<File | null>(null);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SingUpFormParams>();
  const dispatch = useTypeDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: SingUpFormParams) => {
    // dispatch(signUpUser(data));
    // navigate("/dashboard");

    console.log(data);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="avatar"
        render={({ field }) => (
          <FileField
            icon={<LuImagePlus size="1.2rem" className="text-primary" />}
            file={field.value}
            onChange={(e) =>
              field.onChange(e.target.files ? e.target.files[0] : null)
            }
            clearHandler={() => setValue("avatar", null)}
            accept=".svg,.jpg,.png,.jpeg"
          />
        )}
      />

      <div className="flex gap-4">
        {/* maybe change flex direcition on smaller screens */}
        <Field
          variant="standart"
          placeholder="First Name"
          errors={errors.firstName}
          {...register("firstName", fieldValidation)}
        />
        <Field
          variant="standart"
          placeholder="Last Name"
          errors={errors.lastName}
          {...register("lastName", fieldValidation)}
        />
      </div>
      <Field
        type="email"
        variant="icon"
        icon={mailIcon}
        placeholder="Email address"
        errors={errors.email}
        {...register("email", emailValidation)}
      />
      <PasswordField
        placeholder="Password"
        errors={errors.password}
        {...register("password", passwordValidation)}
      />
      <PasswordField
        placeholder="Confirm Password"
        errors={errors.confirmPassword}
        {...register("confirmPassword", passwordConfirmValidation)}
      />
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="text-background font-main font-medium text-md min-w-36 h-11 w-7/12 hover:shadow-primary-button transition-all duration-3 hover:-translate-y-[1px]"
        >
          {isSubmitting ? "Loading.." : "Sign Up"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
