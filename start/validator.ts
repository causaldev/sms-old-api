import { validator } from '@ioc:Adonis/Core/Validator';
import FixedPaymentPendingService from 'app/modules/finance/paymentLatest/fixed/fixedPaymentPending/lib/fixedPaymentPendingService';
import FixedStudentPaymentService from 'app/modules/finance/paymentLatest/fixed/fixedStudentPayment/lib/fixedStudentPaymentService';
import RecurrentPaymentPendingService from 'app/modules/finance/paymentLatest/recurrent/recurrentPaymentPending/lib/recurrentPaymentPendingService';
import RecurrentStudentPaymentService from 'app/modules/finance/paymentLatest/recurrent/recurrentStudentPayment/lib/recurrentStudentPaymentService';
import { CustomFailRules } from 'app/modules/_shared/types';

const ruleMap: Record<
  CustomFailRules,
  (d: any, root: any) => Promise<boolean>
> = {
  fixedStudentInPending: FixedPaymentPendingService.studentInPending,
  fixedStudentPaid: FixedStudentPaymentService.studentPaid,
  recurrentChildStudentPending: RecurrentPaymentPendingService.studentInPending,
  recurrentChildStudentPaid: RecurrentStudentPaymentService.studentPaid,
};

validator.rule(
  'custom',
  async (value, arg: [CustomFailRules, string], options) => {
    const [ruleKey, message] = arg;

    if (await ruleMap[ruleKey](value, options.root)) {
      options.errorReporter.report(
        options.pointer,
        'custom',
        message,
        options.arrayExpressionPointer
      );
    }
  },
  () => ({
    async: true,
  })
);
