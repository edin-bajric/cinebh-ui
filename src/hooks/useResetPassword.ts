import { useMutation } from "react-query";
import { UserService } from "../services";

type ResetPasswordVariables = {
  email: string;
  password: string;
};

const useResetPassword = () => {
  const mutation = useMutation<void, Error, ResetPasswordVariables>(
    ({ email, password }) => UserService.resetPassword(email, password)
  );

  return mutation;
};

export default useResetPassword;
