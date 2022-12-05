import ApiController from 'app/modules/_shared/apiController';
import FeePayment from './feePayment';
import FeePaymentService from './feePaymentService';
import CFeePaymentVal from './cFeePaymentVal';
import EFeePaymentVal from './eFeePaymentVal';

export default class FeePaymentController extends ApiController<FeePayment> {
  constructor(protected service = new FeePaymentService()) {
    super(service, {
      createValidator: CFeePaymentVal,
      editValidator: EFeePaymentVal,
    });
  }
}
