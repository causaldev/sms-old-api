import FixedPayment from '../../fixedPayment';
import FixedStudentPayment from '../fixedStudentPayment';

const FixedStudentPaymentReport = {
  parsePayments: (studentPayments: FixedStudentPayment[]) => {
    const paymentMap: Record<
      string,
      {
        fixed: FixedPayment;
        amountTotal: number;
        penaltyTotal: number;
        count: number;
      }
    > = {};

    studentPayments.forEach((payment) => {
      if (paymentMap[payment.fixed_payment_id] === undefined) {
        paymentMap[payment.fixed_payment_id] = {
          fixed: payment.fixedPayment,
          amountTotal: 0,
          penaltyTotal: 0,
          count: 0,
        };
      }

      const curPayment = paymentMap[payment.fixed_payment_id];

      paymentMap[payment.fixed_payment_id] = {
        fixed: payment.fixedPayment,
        amountTotal: curPayment.amountTotal + payment.amount,
        penaltyTotal: curPayment.penaltyTotal + payment.penalty,
        count: curPayment.count + 1,
      };
    });

    return Object.values(paymentMap).sort((a, b) =>
      a.fixed.description.localeCompare(b.fixed.description)
    );
  },

  report: async (startDate: string, endDate: string) => {
    const studentPayments = await FixedStudentPayment.query()
      .preload('fixedPayment')
      .where('created_at', '>=', `${startDate} 00:00:00`)
      .where('created_at', '<=', `${endDate} 23:59:59`);

    const amountTotal = studentPayments
      .map((i) => i.amount)
      .reduce((a, b) => a + b, 0);
    const penaltyTotal = studentPayments
      .map((i) => i.penalty)
      .reduce((a, b) => a + b, 0);

    const payments = FixedStudentPaymentReport.parsePayments(studentPayments);

    return {
      payments,
      amountTotal,
      penaltyTotal,
      count: studentPayments.length,
    };
  },
};

export default FixedStudentPaymentReport;
