export type PaymentLookupInput = {
  studentName: string;
  studentClass: string;
  rollNo: string;
  dob: string;
};

export type PaymentDueItem = {
  id: string;
  label: string;
  amount: number;
  isAdmissionFee?: boolean;
  paid: boolean;
};

export type PaymentTransaction = {
  date: string;
  amount: string;
  status: string;
};

export type PaymentStudentProfile = PaymentLookupInput & {
  dues: PaymentDueItem[];
  transactions: PaymentTransaction[];
  note: string;
};

export const PAYMENT_STUDENTS: PaymentStudentProfile[] = [
  {
    studentName: "Aarav Sharma",
    studentClass: "8",
    rollNo: "S001",
    dob: "2011-04-12",
    note: "Monthly dues fetched from the academic finance ledger.",
    dues: [
      { id: "jan-2026", label: "January 2026 Fee", amount: 2400, paid: false },
      { id: "feb-2026", label: "February 2026 Fee", amount: 2400, paid: false },
      { id: "mar-2026", label: "March 2026 Fee", amount: 2400, paid: true },
      { id: "apr-2026", label: "April 2026 Fee", amount: 2400, paid: false },
      { id: "admission", label: "Admission Fee", amount: 3500, paid: false, isAdmissionFee: true },
    ],
    transactions: [
      { date: "12 Apr 2026", amount: "₹4,800", status: "Paid" },
      { date: "15 Mar 2026", amount: "₹2,400", status: "Paid" },
      { date: "12 Feb 2026", amount: "₹5,000", status: "Paid" },
    ],
  },
  {
    studentName: "Priya Das",
    studentClass: "7",
    rollNo: "S002",
    dob: "2012-09-21",
    note: "Demo student for fee lookup and payment review.",
    dues: [
      { id: "jan-2026", label: "January 2026 Fee", amount: 2200, paid: false },
      { id: "feb-2026", label: "February 2026 Fee", amount: 2200, paid: false },
      { id: "mar-2026", label: "March 2026 Fee", amount: 2200, paid: false },
      { id: "admission", label: "Admission Fee", amount: 3000, paid: true, isAdmissionFee: true },
    ],
    transactions: [
      { date: "10 Apr 2026", amount: "₹3,000", status: "Paid" },
      { date: "15 Mar 2026", amount: "₹2,200", status: "Paid" },
      { date: "08 Feb 2026", amount: "₹2,200", status: "Paid" },
    ],
  },
];

export function findPaymentStudentMock(input: PaymentLookupInput) {
  const normalizedName = input.studentName.trim().toLowerCase();
  const normalizedClass = input.studentClass.trim().toLowerCase();
  const normalizedRoll = input.rollNo.trim().toUpperCase();
  const normalizedDob = input.dob.trim();

  return PAYMENT_STUDENTS.find((student) => {
    return (
      student.studentName.toLowerCase() === normalizedName &&
      student.studentClass.toLowerCase() === normalizedClass &&
      student.rollNo.toUpperCase() === normalizedRoll &&
      student.dob === normalizedDob
    );
  });
}
