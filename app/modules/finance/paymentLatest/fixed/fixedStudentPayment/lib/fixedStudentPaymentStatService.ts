import FixedStudentPayment from '../fixedStudentPayment';

const FixedStudentPaymentStatService = {
  _getPenaltyTotal: (_payments: FixedStudentPayment[]) => {
    return 0;
  },

  _getAmountTotal: (_payments: FixedStudentPayment[]) => {
    return 0;
  },

  getFixedStats: async (
    paymentId: string
  ): Promise<{
    penaltyTotal: number;
    amountTotal: number;
    grandTotal: number;
  }> => {
    const payments = await FixedStudentPayment.query().where(
      'fixed_payment_id',
      paymentId
    );

    if (payments.length === 0) {
      return {
        penaltyTotal: 0,
        amountTotal: 0,
        grandTotal: 0,
      };
    }

    const penaltyTotal =
      FixedStudentPaymentStatService._getAmountTotal(payments);
    const amountTotal =
      FixedStudentPaymentStatService._getAmountTotal(payments);
    const grandTotal = penaltyTotal + amountTotal;

    return {
      penaltyTotal,
      amountTotal,
      grandTotal,
    };
  },
};

export default FixedStudentPaymentStatService;
