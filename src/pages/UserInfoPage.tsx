import { useTypeSelector } from "@/hooks/useReduxHooks";

const UserInfoPage = () => {
  const { user } = useTypeSelector((state) => state.userReducer);
  return (
    <div className="p-4 m-10 bg-white shadow">
      <h1>UserInfo</h1>
      <h1>{user.email}</h1>
      <h1>{user.firstName}</h1>
      <h1>{user.lastName}</h1>
    </div>
  );
};

export default UserInfoPage;
