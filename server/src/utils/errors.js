/**
 * Helper for getting custom error messages out of mongoose ValidationError objects.
 * You should provide it a full error object from catch clause
 * and a model name string.
 *
 * Expected return value: Array<String>
 */
const getMongooseValidationErrorMessages = ({ errors }, modelName) => {
  const getErrorMessage = (err) => {
    switch (err.kind) {
      case 'unique':
        return `${modelName} with such ${err.path} already exists`;
      case 'min':
      case 'user defined':
        return err.message;
      default:
        return 'Something went wrong';
    }
  };

  return errors
    ? Object.values(errors).map(getErrorMessage)
    : ['Something went wrong'];
};

module.exports = { getMongooseValidationErrorMessages };
