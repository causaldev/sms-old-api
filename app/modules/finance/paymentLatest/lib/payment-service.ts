import FixedStudentPayment from '../fixed/fixedStudentPayment/fixedStudentPayment';
import FixedStudentPaymentService from '../fixed/fixedStudentPayment/lib/fixedStudentPaymentService';
import RecurrentStudentPaymentService from '../recurrent/recurrentStudentPayment/lib/recurrentStudentPaymentService';
import RecurrentStudentPayment from '../recurrent/recurrentStudentPayment/recurrentStudentPayment';

type AttachmentPayment =
  | {
      payment: FixedStudentPayment;
      attachment: number;
      type: string;
    }
  | {
      payment: RecurrentStudentPayment;
      attachment: number;
      type: string;
    };

export default {
  analyzeAttachment: (payments: AttachmentPayment[]) => {
    const items: (AttachmentPayment | { attachment: number; type: 'empty' })[] =
      [];

    for (let i = 0; i < payments.length; i++) {
      const curPayment = payments[i];
      if (i === 0) {
        items.push(curPayment);
        continue;
      }

      if (
        i + 1 < payments.length - 1 &&
        payments[i + 1].attachment > curPayment.attachment + 1
      ) {
        for (
          let j = curPayment.attachment + 1;
          j < payments[i + 1].attachment;
          j++
        ) {
          items.push({ type: 'empty', attachment: j });
        }
      } else {
        items.push(curPayment);
      }
    }

    return items;
  },

  getAttachmentReport: async (start: string, end: string) => {
    const fixeds = await FixedStudentPaymentService.attachmentRange(start, end);
    const recurrents = await RecurrentStudentPaymentService.attachmentRange(
      start,
      end
    );

    const fixedMapped = fixeds.map((i) => ({
      payment: i,
      attachment: i.attachment,
      type: 'fixed',
    }));
    const recurrentMapped = recurrents.map((i) => ({
      payment: i,
      attachment: i.attachment,
      type: 'recurrent',
    }));

    return [...fixedMapped, ...recurrentMapped].sort(
      (a, b) => a.attachment - b.attachment
    );
  },
};
