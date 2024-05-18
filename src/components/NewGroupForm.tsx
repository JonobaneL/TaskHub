import { useForm } from "react-hook-form";
import Field from "./ui/Field";
import { Button } from "./ui/button";
import { NewGroupFormParams } from "@/models/formTypes";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import NewGroupColorSelect from "./NewGroupColorSelect";
import { addNewGroup } from "@/store/thunks/projectsThunks";
import { getGroupNameValidation } from "@/utils/formValidations";

type FormProps = {
  onClose: () => void;
};

const NewGroupForm = ({ onClose }: FormProps) => {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewGroupFormParams>();
  const dispatch = useTypeDispatch();
  const submitHandler = async (data: NewGroupFormParams) => {
    dispatch(addNewGroup(data));
    onClose();
  };
  const { project } = useTypeSelector((state) => state.projectReducer);
  const groupNameValidation = getGroupNameValidation(project.tables || []);
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Field
        variant="standart"
        placeholder="Name"
        errors={errors.name}
        {...register("name", groupNameValidation)}
      />
      <NewGroupColorSelect
        control={control}
        setValue={setValue}
        error={errors.color}
      />
      <Button
        className="w-fit h-9 text-white font-main block mt-3 mr-0 ml-auto"
        variant="default"
        type="submit"
        disabled={isSubmitting}
      >
        Add Group
      </Button>
    </form>
  );
};

export default NewGroupForm;
