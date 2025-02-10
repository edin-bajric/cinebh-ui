export const handleCardNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setCardNumber: React.Dispatch<React.SetStateAction<string>>
) => {
  const inputValue = e.target.value.replace(/\s+/g, "");
  if (/^\d*$/.test(inputValue)) {
    const formattedValue = inputValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formattedValue);
  }
};

export const handleExpiryDateChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setExpiryDate: React.Dispatch<React.SetStateAction<string>>
) => {
  let inputValue = e.target.value.replace(/\D/g, "");
  if (inputValue.length > 4) inputValue = inputValue.slice(0, 4);
  if (inputValue.length > 2) {
    inputValue = inputValue.slice(0, 2) + "/" + inputValue.slice(2);
  }
  setExpiryDate(inputValue);
};

export const handleCvcChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setCvc: React.Dispatch<React.SetStateAction<string>>
) => {
  const inputValue = e.target.value.replace(/\D/g, "");
  if (inputValue.length <= 3) setCvc(inputValue);
};
