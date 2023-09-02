export const numberValidator = (rule: any, value: any, field: string) => {
  if (!value) {
    return Promise.reject(`Please enter a number for ${field}`);
  }

  // Use a regular expression to check if the value contains only digits
  const numberPattern = /^[0-9]+$/;
  if (!numberPattern.test(value)) {
    return Promise.reject(`Please enter a valid number for ${field}`);
  }

  return Promise.resolve();
};

export const yearValidator = (
  rule: any,
  value: any,
  field: string,
  isFourDigit: boolean = false
) => {
  if (!value) {
    return Promise.reject(`Please enter a number for ${field}`);
  }

  // Check if the value is a valid number
  const numberPattern = /^[0-9]+$/;
  if (!numberPattern.test(value)) {
    return Promise.reject(`Please enter a valid number for ${field}`);
  }

  // Check if the value has a maximum length of four characters
  if (value.length !== 4) {
    return Promise.reject(`Please enter a four-digit number for ${field}`);
  }

  // Convert the value to a numeric integer
  const year = parseInt(value, 10);

  // Check if the year is within the specified range
  const currentYear = new Date().getFullYear();
  if (year < 1984 || year > currentYear) {
    return Promise.reject(
      `Please enter a valid year between 1984 and ${currentYear} for ${field}`
    );
  }

  return Promise.resolve();
};

export const phoneNumberValidator = (rule: any, value: any, field: string) => {
  if (!value) {
    return Promise.reject(`Please enter a phone number`);
  }

  // Check if the value contains only digits
  const numberPattern = /^[0-9]+$/;
  if (!numberPattern.test(value)) {
    return Promise.reject(`Please enter a valid phone number`);
  }

  // Define the minimum and maximum length for the phone number
  const minLength = 8;
  const maxLength = 15;

  // Check if the length of the value is within the specified range
  if (value.length < minLength || value.length > maxLength) {
    return Promise.reject(
      `Please enter a phone number between ${minLength} and ${maxLength} digits for ${field}`
    );
  }

  return Promise.resolve();
};
