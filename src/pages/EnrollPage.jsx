// ────────────────────────────────────────────────────────────────
// ENROLL PAGE
//
// S3.2 (15 pts) — Static form markup with TailwindCSS:
//   • labeled student-id input (number)
//   • labeled course <select> (use the two SAMPLE_COURSES as options
//     for now)
//   • a submit button with a hover state
//   • a green success box and a red error box (hardcode both visible
//     for S3.2 — you will show/hide them in S4.4)
//
// S4.4 (15 pts) — Make it dynamic:
//   • fill the select with real courses from GET /courses (name + fee +
//     how many seats left)
//   • on submit: POST /enrollments with { studentId, courseId } (numbers!)
//   • success → show a success message in the green box, clear the form
//   • failure (404 / 409) → show the API's error message in the red box
//   • only one of the two boxes is visible at a time
// ────────────────────────────────────────────────────────────────
// S3.2 — Static form markup

import { BASE_URL } from "../api";

const SAMPLE_COURSES = [
  { id: 1, name: "Sample Course One", fee: 120, seatsTotal: 20, seatsAvailable: 18 },
  { id: 2, name: "Sample Course Two", fee: 200, seatsTotal: 10, seatsAvailable: 0 },
];

export default function EnrollPage() {
  return (
    <section className="max-w-lg">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Enroll Student
      </h2>

      <form className="space-y-4">
        {/* Student ID */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Student ID
          </label>
          <input
            type="number"
            placeholder="Enter student ID"
            className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Course Select */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Course
          </label>

          <select className="w-full rounded-md border border-slate-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select a course</option>

            {SAMPLE_COURSES.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Enroll
        </button>
      </form>

      {/* Success Box */}
      <div className="mt-6 rounded-md border border-green-300 bg-green-100 p-4 text-green-700">
        Student enrolled successfully!
      </div>

      {/* Error Box */}
      <div className="mt-4 rounded-md border border-red-300 bg-red-100 p-4 text-red-700">
        Failed to enroll student.
      </div>
    </section>
  );
}