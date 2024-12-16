export const getUserNameFromToken = (decodedToken: any) => {
  return decodedToken?.sub.split("@")[0];
};
