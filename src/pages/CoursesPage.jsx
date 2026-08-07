// ────────────────────────────────────────────────────────────────
// COURSES PAGE
//
// S3.1 
//
// S4.1 (10 pts) — Load the real courses from GET /courses when the page
//   mounts (useEffect + fetch). Show "Loading…" while the request runs.
//   Replace SAMPLE_COURSES with the fetched data.
//
// S4.2 (10 pts) — Make the search input work: typing (or submitting)
//   refetches with GET /courses?search=<text> so the table only shows
//   matching names.
// ────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { BASE_URL } from '../api';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');


  // S4.1 + S4.2
  async function loadCourses(searchText = '') {
    setLoading(true);

    try {
      const url = searchText
        ? `${BASE_URL}/courses?search=${searchText}`
        : `${BASE_URL}/courses`;

      const response = await fetch(url);
      const data = await response.json();

      setCourses(data);

    } catch (error) {
      console.error('Failed to load courses:', error);

    } finally {
      setLoading(false);
    }
  }

  // Load courses when page opens
  useEffect(() => {
    loadCourses();
  }, []);


  // Search submit
  function handleSearch(e) {
    e.preventDefault();
    loadCourses(search);
  }


  return (
    <section className="p-6">
      <div className="rounded-xl bg-white p-6 shadow-md">

        {/* Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Courses
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Browse available courses and seat availability.
          </p>
        </div>


        {/* Search */}
        <form onSubmit={handleSearch} className="mb-5">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="
              w-full rounded-lg border border-slate-300
              px-4 py-3 text-sm
              placeholder:text-slate-400
              transition
              focus:border-blue-500
              focus:outline-none
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </form>

        {/* Loading */}
        {loading ? (

          <p className="text-slate-500">
            Loading…
          </p>

        ) : (

          <div className="overflow-hidden rounded-lg border border-slate-200">

            <table className="w-full text-left">

              <thead className="bg-slate-100">
                <tr>

                  <th className="px-5 py-3 text-sm font-semibold text-slate-600">
                    ID
                  </th>

                  <th className="px-5 py-3 text-sm font-semibold text-slate-600">
                    Course Name
                  </th>

                  <th className="px-5 py-3 text-sm font-semibold text-slate-600">
                    Fee
                  </th>

                  <th className="px-5 py-3 text-sm font-semibold text-slate-600">
                    Seats
                  </th>

                </tr>
              </thead>


              <tbody>

                {courses.map((course) => (

                  <tr
                    key={course.id}
                    className="
                      border-t border-slate-200
                      transition
                      hover:bg-slate-50
                    "
                  >

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {course.id}
                    </td>


                    <td className="px-5 py-4 font-medium text-slate-800">
                      {course.name}
                    </td>


                    <td className="px-5 py-4 text-sm text-slate-700">
                      ${course.fee}
                    </td>


                    <td className="px-5 py-4">

                      <span
                        className={`
                          inline-flex items-center
                          rounded-full
                          px-3 py-1
                          text-xs font-semibold
                          text-white
                          ${
                            course.seatsAvailable > 0
                              ? 'bg-emerald-500'
                              : 'bg-red-500'
                          }
                        `}
                      >

                        {course.seatsAvailable} / {course.seatsTotal}

                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
    </section>
  );
}

