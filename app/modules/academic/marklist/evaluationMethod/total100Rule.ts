import { validator } from '@ioc:Adonis/Core/Validator';
import EvaluationTypeRepo from '../evaluationType/evaluationTypeRepo';

export default () => {
  validator.rule(
    'total100',
    async (value, _compiledOptions, options) => {
      /**
       * Skip validation when value is not a string. The string
       * schema rule will handle it
       */
      if (!Array.isArray(value)) {
        return;
      }

      const { errorReporter, arrayExpressionPointer, pointer } = options;

      // console.log(value);
      const totals100 = await new EvaluationTypeRepo().totals100(value);

      if (!totals100) {
        errorReporter.report(
          pointer,
          'total100',
          'Evaluation types must add up to 100',
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
