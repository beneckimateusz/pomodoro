/**
 * Helper for react-hook-form error messages
 * useful when it comes to multiple validators used on one input
 *
 * Note that if the form uses minLength validator at any point,
 * appropriate minLengths object should be passed along with the errors object.
 * Its values can and should be used in your form's validators.
 *
 * e.g.
 * const minLengths = {
 *   username: 3,
 *   password: 8,
 * };
 */
export const createErrorMessages = (errors, minLengths) => {
  const getErrorMessage = (inputName, errorType) => {
    switch (errorType) {
      case 'required':
        return 'This field is required';
      case 'minLength':
        return `This field should be at least ${minLengths[inputName]} characters long`;
      default:
        return 'Invalid input';
    }
  };

  const errorMessages = {};

  Object.keys(errors).forEach((inputName) => {
    errorMessages[inputName] = getErrorMessage(
      inputName,
      errors[inputName].type
    );
  });

  return errorMessages;
};
