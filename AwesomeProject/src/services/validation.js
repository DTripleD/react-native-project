const shemaRegex = {
  password:
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  username: /^[a-zA-Z0-9]+$/,
};

const validateName = (value, setIsValid) => {
  if (value.trim().length > 2) {
    setIsValid(true);
  } else {
    setIsValid(false);
  }
};

const validateEmail = (text, setIsValidEmail) => {
  const emailRegex = shemaRegex.email;
  if (emailRegex.test(text)) {
    setIsValidEmail(true);
  } else {
    setIsValidEmail(false);
  }
};

const validationPassword = (password, setIsValidPassword) => {
  const passwordRegex = shemaRegex.password;
  if (passwordRegex.test(password)) {
    setIsValidPassword(true);
  } else {
    setIsValidPassword(false);
  }
};

export { validateName, validateEmail, validationPassword };
