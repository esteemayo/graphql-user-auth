export const validateRegisterInput = (
  name,
  email,
  username,
  password,
  passwordConfirm
) => {
  const errors = {};

  if (name.trim() === "") {
    errors.name = "Please tell us your name";
  }

  if (email.trim() === "") {
    errors.email = "Please tell us your password";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)*[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Please provide a valid email address";
    }
  }

  if (username.trim() === "") {
    errors.username = "Please tell us your username";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  } else if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (email, password) => {
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)*[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Please provide a valid email address";
    }
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
