import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api"; 

const SharePage = () => {
  const { token } = useParams();
  const [studentData, setStudentData] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log(token);
    api.get(`/share?shareToken=${token}`)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setStudentData(data);
      })
      .catch(() => setError("Invalid or expired link."));
  }, [token]);

  const filteredData = studentData.filter(student =>
    student.email?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Student Info</h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {!error && (
        <>
          <input
            type="text"
            placeholder="Search by email"
            className="border px-3 py-2 rounded-full w-full mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Roll No</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((s, i) => (
                <tr key={i}>
                  <td className="p-2 border">{s.first_name+s.last_name || "-"}</td>
                  <td className="p-2 border">{s.email || "-"}</td>
                  <td className="p-2 border">{s.roll_no || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SharePage;
