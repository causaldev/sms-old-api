import { validator } from '@ioc:Adonis/Core/Validator';

export default () => {
  validator.rule(
    'gt',
    async (value, compiledOptions, options) => {
      if (typeof value !== 'number') {
        return;
      }

      const [arg] = compiledOptions as number[];
      const { errorReporter, arrayExpressionPointer, pointer, field } = options;

      if (value <= arg) {
        errorReporter.report(
          pointer,
          'gt',
          `${field} must be greater than ${arg}`,
          arrayExpressionPointer
        );
      }
    },
    (_options) => {
      return {
        async: true,
      };
    }
  );
};
