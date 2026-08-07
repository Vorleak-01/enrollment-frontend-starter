// ────────────────────────────────────────────────────────────────
// STUDENT PAGE
//
// S3.3 (15 pts) — Static markup with TailwindCSS, using SAMPLE_STUDENT:
//   • a student-id input + "Load" button (styled, with hover state)
//   • a student info card (name, email, phone)
//   • an enrollments table: course name, fee, enroll date,
//     status badge (ACTIVE = green, DROPPED = gray),
//     and a "Drop" button ONLY on ACTIVE rows
//
// S4.3 (10 pts) — Clicking "Load" fetches GET /students/<id> and shows
//   the real student + enrollments. For an unknown id, show the API's
//   error message (red box) instead of the card.
//
// S4.5 (10 pts) — Clicking "Drop" calls PUT /enrollments/<id>/drop,
//   then reloads the student so the status badge updates and the button
//   disappears.
// ────────────────────────────────────────────────────────────────
import { BASE_URL } from '../api';

// Use this sample data to build the static markup for S3.3.
// In S4.3 you will replace it with data from the API.
const SAMPLE_STUDENT = {
  id: 1,
  name: 'Sample Student',
  email: 'sample@example.com',
  phone: '012345678',
  enrollments: [
    { id: 1, status: 'ACTIVE', enrollDate: '2026-07-01', course: { name: 'Sample Course One', fee: 120 } },
    { id: 2, status: 'DROPPED', enrollDate: '2026-06-01', course: { name: 'Sample Course Two', fee: 200 } },
  ],
};

function StatusBadge({ status }) {
  const isActive = status === 'ACTIVE';
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
        isActive
          ? 'bg-green-100 text-green-700'
          : 'bg-slate-200 text-slate-600'
      }`}
    >
      {status}
    </span>
  );
}

export default function StudentPage() {
  // TODO S4.3 — load the real student from the API on "Load"
  // TODO S4.5 — make the "Drop" button work, then reload the student
  const student = SAMPLE_STUDENT;

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Student lookup</h2>

      {/* S3.3 — student-id input + Load button */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter student ID..."
          className="w-full rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          Load
        </button>
      </div>

      {/* S3.3 — student info card */}
      <div className="mb-6 rounded-md border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="text-base font-semibold text-slate-800">{student.name}</h3>
        <p className="text-sm text-slate-500">{student.email}</p>
        <p className="text-sm text-slate-500">{student.phone}</p>
      </div>

      {/* S3.3 — enrollments table */}
      <div className="overflow-hidden rounded-md border border-slate-200 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-slate-700">
                Course
              </th>
              <th className="px-4 py-2 text-left font-semibold text-slate-700">
                Fee
              </th>
              <th className="px-4 py-2 text-left font-semibold text-slate-700">
                Enroll date
              </th>
              <th className="px-4 py-2 text-left font-semibold text-slate-700">
                Status
              </th>
              <th className="px-4 py-2 text-left font-semibold text-slate-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {student.enrollments.map((enrollment, idx) => (
              <tr
                key={enrollment.id}
                className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="px-4 py-2 text-slate-700">
                  {enrollment.course.name}
                </td>
                <td className="px-4 py-2 text-slate-700">
                  ${enrollment.course.fee}
                </td>
                <td className="px-4 py-2 text-slate-700">
                  {enrollment.enrollDate}
                </td>
                <td className="px-4 py-2">
                  <StatusBadge status={enrollment.status} />
                </td>
                <td className="px-4 py-2">
                  {enrollment.status === 'ACTIVE' && (
                    <button
                      type="button"
                      className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:bg-red-700"
                    >
                      Drop
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}