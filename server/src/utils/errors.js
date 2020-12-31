const { UserInputError } = require('apollo-server');

const mongooseErrorHelper = (errors, modelName) => {
  Object.values(errors).forEach((err) => {
    // eslint-disable-next-line default-case
    switch (err.kind) {
      case 'unique':
        throw new UserInputError(
          `${modelName} with such ${err.path} already exists.`
        );
    }
  });
};

module.exports = { mongooseErrorHelper };
