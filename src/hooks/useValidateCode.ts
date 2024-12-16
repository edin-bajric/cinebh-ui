import { useMutation } from "react-query";
import { UserService } from "../services";

type ValidateCodeVariables = {
  email: string;
  code: string;
};

const useValidateCode = () => {
  const mutation = useMutation<void, Error, ValidateCodeVariables>(
    ({ email, code }) => UserService.validateCode(email, code)
  );

  return mutation;
};

export default useValidateCode;
