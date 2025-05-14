import { useState, useEffect } from "react";
import CreateShows from "./Create/CreateShows";

const ManageShowtimes = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [cinemas, setCinemas] = useState([]);

  useEffect(() => {
    setShowtimes([
      {
        id: 1,
        movie: "Godzilla x Kong",
        cinema: "CGV Nguyễn Du",
        time: "18:00",
      },
      { id: 2, movie: "Dune 2", cinema: "CGV Aeon Mall", time: "20:30" },
    ]);

    setMovies([
      { id: "1", title: "Godzilla x Kong" },
      { id: "2", title: "Dune 2" },
    ]);

    setCinemas([
      { id: "101", name: "CGV Nguyễn Du" },
      { id: "102", name: "CGV Aeon Mall" },
    ]);
  }, []);

  const handleAddShowtime = (newShowtime) => {
    const movie = movies.find((m) => m.id === newShowtime.movieId)?.title || "";
    const cinema =
      cinemas.find((c) => c.id === newShowtime.cinemaId)?.name || "";

    setShowtimes([
      ...showtimes,
      { id: Date.now(), movie, cinema, time: newShowtime.time },
    ]);
  };

  const handleDeleteShowtime = (id) => {
    setShowtimes(showtimes.filter((showtime) => showtime.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Quản lý suất chiếu
      </h1>

      {/* Form thêm suất chiếu */}
      <CreateShows
        movies={movies}
        cinemas={cinemas}
        onAddShowtime={handleAddShowtime}
      />

      {/* Danh sách suất chiếu */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Phim</th>
              <th className="py-3 px-4 text-left">Rạp</th>
              <th className="py-3 px-4 text-center">Thời gian</th>
              <th className="py-3 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.map((showtime) => (
              <tr key={showtime.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">{showtime.movie}</td>
                <td className="py-3 px-4">{showtime.cinema}</td>
                <td className="py-3 px-4 text-center">{showtime.time}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleDeleteShowtime(showtime.id)}
                    className="bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageShowtimes;
