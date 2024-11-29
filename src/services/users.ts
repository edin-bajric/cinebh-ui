import appAxios from "./appAxios";

const sendPasswordResetEmail = async (email: string): Promise<void> => {
  try {
    await appAxios.post(`/users/send-email?email=${encodeURIComponent(email)}`);
  } catch (error) {
    throw new Error("Failed to send email");
  }
};

export default { sendPasswordResetEmail };
