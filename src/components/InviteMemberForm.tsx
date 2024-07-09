import {
  emailValidation,
  invitedEmailsValidation,
} from "@/utils/formValidations";
import { Controller, useForm } from "react-hook-form";
import ListField from "./ui/ListField";
import { Button } from "./ui/button";
import RoleRadioGroup from "./RoleRadioGroup";

type FormParams = {
  emails: string[];
  role: "member" | "guest";
};

const InviteMemberForm = () => {
  const { control, handleSubmit, reset } = useForm<FormParams>({
    defaultValues: {
      emails: [],
      role: "member",
    },
  });
  const onSubmit = (data: FormParams) => {
    //add event
    console.log(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="emails"
        control={control}
        rules={invitedEmailsValidation}
        render={({ field }) => (
          <ListField
            validation={emailValidation}
            list={field.value}
            setList={field.onChange}
          />
        )}
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <RoleRadioGroup value={field.value} onChange={field.onChange} />
        )}
      />
      <Button
        type="submit"
        className="h-fit w-fit px-3 py-2 font-medium text-background font-main rounded-sm block ml-auto mr-0 mt-1"
      >
        Invite
      </Button>
    </form>
  );
};

export default InviteMemberForm;
