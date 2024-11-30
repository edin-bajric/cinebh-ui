import appAxios from "./appAxios";

const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    await appAxios.post(`/users/send-email?email=${encodeURIComponent(email)}`);
  } catch (error) {
    throw new Error("Failed to send email");
  }
};

const validateCode = async (email: string, code: string): Promise<void> => {
  try {
    await appAxios.patch(
      `/users/validate-code?email=${encodeURIComponent(email)}&code=${code}`
    );
  } catch (error) {
    throw new Error("Failed to validate code");
  }
};

export default { sendPasswordResetEmail, validateCode };
