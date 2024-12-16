import { useMutation } from "react-query";
import { UserService } from "../services";

const useSendPasswordResetEmail = () => {
  const mutation = useMutation<void, Error, string>(
    UserService.sendPasswordResetEmail
  );

  return mutation;
};

export default useSendPasswordResetEmail;
