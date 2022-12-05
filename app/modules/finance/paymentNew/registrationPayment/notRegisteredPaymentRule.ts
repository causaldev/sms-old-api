import { validator } from '@ioc:Adonis/Core/Validator';
import RegistrationPaymentRepo from './registrationPaymentRepo';

export type NotRegisteredPaymentArg = {
  message: string;
};

export default () => {
  validator.rule(
    'notRegisteredPayment',
    async (value, compiledOptions, options) => {
      /**
       * Skip validation when value is not a string. The string
       * schema rule will handle it
       */
      if (typeof value !== 'string') {
        return;
      }

      const [{ message }] = compiledOptions as NotRegisteredPaymentArg[];
      const { errorReporter, arrayExpressionPointer, pointer } = options;

      const registered =
        await new RegistrationPaymentRepo().alreadyRegisteredForCurrentYear(
          value
        );

      if (registered) {
        errorReporter.report(
          pointer,
          'notRegisteredPayment',
          message,
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
