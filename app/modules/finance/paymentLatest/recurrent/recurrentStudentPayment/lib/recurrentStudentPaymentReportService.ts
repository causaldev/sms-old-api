import RecurrentPayment from '../../recurrentPayment';
import RecurrentPaymentChild from '../../recurrentPaymentChild/recurrentPaymentChild';
import RecurrentStudentPayment from '../recurrentStudentPayment';

const RecurrentStudentPaymentReportService = {
  parseReports: (payments: RecurrentStudentPayment[]) => {
    const paymentMap: Record<
      string,
      {
        recurrent: RecurrentPayment;
        recurrentChildren: Record<
          string,
          {
            payment: RecurrentPaymentChild;
            amountTotal: number;
            penaltyTotal: number;
            count: number;
          }
        >;
        amountTotal: number;
        penaltyTotal: number;
        count: number;
      }
    > = {};

    payments.forEach((payment) => {
      if (paymentMap[payment.recurrent_payment_id] === undefined) {
        paymentMap[payment.recurrent_payment_id] = {
          recurrent: payment.recurrentPayment,
          recurrentChildren: {},
          amountTotal: 0,
          penaltyTotal: 0,
          count: 0,
        };
      }
      if (
        paymentMap[payment.recurrent_payment_id].recurrentChildren[
          payment.recurrent_payment_child_id
        ] === undefined
      ) {
        paymentMap[payment.recurrent_payment_id].recurrentChildren[
          payment.recurrent_payment_child_id
        ] = {
          payment: payment.recurrentPaymentChild,
          amountTotal: 0,
          penaltyTotal: 0,
          count: 0,
        };
      }

      const curPayment = paymentMap[payment.recurrent_payment_id];
      const curChildPayment =
        paymentMap[payment.recurrent_payment_id].recurrentChildren[
          payment.recurrent_payment_child_id
        ];

      paymentMap[payment.recurrent_payment_id] = {
        recurrent: payment.recurrentPayment,
        recurrentChildren: {
          ...curPayment.recurrentChildren,
          [payment.recurrent_payment_child_id]: {
            payment: payment.recurrentPaymentChild,
            amountTotal: curChildPayment.amountTotal + payment.amount,
            penaltyTotal: curChildPayment.penaltyTotal + payment.penalty,
            count: curChildPayment.count + 1,
          },
        },
        amountTotal: curPayment.amountTotal + payment.amount,
        penaltyTotal: curPayment.penaltyTotal + payment.penalty,
        count: curPayment.count + 1,
      };
    });

    const parsedPayments = Object.values(paymentMap)
      .map((i) => ({
        ...i,
        recurrentChildren: Object.values(i.recurrentChildren).sort(
          (a, b) => a.payment.order - b.payment.order
        ),
      }))
      .sort((a, b) =>
        a.recurrent.description.localeCompare(b.recurrent.description)
      );

    return parsedPayments;
  },

  report: async (startDate: string, endDate: string) => {
    const studentPayments = await RecurrentStudentPayment.query()
      .preload('recurrentPayment')
      .preload('recurrentPaymentChild')
      .where('created_at', '>=', `${startDate} 00:00:00`)
      .where('created_at', '<=', `${endDate} 23:59:59`);

    const amountTotal = studentPayments
      .map((i) => i.amount)
      .reduce((a, b) => a + b, 0);
    const penaltyTotal = studentPayments
      .map((i) => i.penalty)
      .reduce((a, b) => a + b, 0);

    const payments =
      RecurrentStudentPaymentReportService.parseReports(studentPayments);

    return {
      payments,
      amountTotal,
      penaltyTotal,
      count: studentPayments.length,
    };
  },
};

export default RecurrentStudentPaymentReportService;
