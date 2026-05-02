export type ResultSubject = {
  subject: string;
  marks: number;
  total: number;
  grade: string;
};

export type DemoStudent = {
  name: string;
  class: string;
  roll: string;
  feeCleared: boolean;
  results: ResultSubject[];
  percentage: number;
  rank: number;
};

export const DEMO_STUDENTS: Record<string, DemoStudent> = {
  S001: {
    name: "Aarav Sharma",
    class: "8",
    roll: "S001",
    feeCleared: true,
    results: [
      { subject: "Mathematics", marks: 95, total: 100, grade: "A+" },
      { subject: "Science", marks: 88, total: 100, grade: "A" },
      { subject: "English", marks: 92, total: 100, grade: "A+" },
      { subject: "Hindi", marks: 85, total: 100, grade: "A" },
      { subject: "Social Science", marks: 90, total: 100, grade: "A+" },
      { subject: "Computer Science", marks: 97, total: 100, grade: "A+" },
    ],
    percentage: 91.17,
    rank: 3,
  },
  S002: {
    name: "Priya Das",
    class: "7",
    roll: "S002",
    feeCleared: false,
    results: [
      { subject: "Mathematics", marks: 78, total: 100, grade: "B+" },
      { subject: "Science", marks: 82, total: 100, grade: "A" },
      { subject: "English", marks: 75, total: 100, grade: "B+" },
      { subject: "Hindi", marks: 80, total: 100, grade: "A" },
      { subject: "Social Science", marks: 85, total: 100, grade: "A" },
      { subject: "Computer Science", marks: 88, total: 100, grade: "A" },
    ],
    percentage: 81.33,
    rank: 8,
  },
};
