import { useState } from "react";

const CreateShows = ({ movies = [], cinemas = [], onAddShowtime }) => {
  const [newShowtime, setNewShowtime] = useState({
    movieId: "",
    cinemaId: "",
    time: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newShowtime.movieId || !newShowtime.cinemaId || !newShowtime.time) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    onAddShowtime(newShowtime);
    setNewShowtime({ movieId: "", cinemaId: "", time: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow-md rounded-lg mb-6"
    >
      <div className="grid grid-cols-3 gap-4">
        <select
          value={newShowtime.movieId}
          onChange={(e) =>
            setNewShowtime({ ...newShowtime, movieId: e.target.value })
          }
          className="p-2 border rounded"
        >
          <option value="">Chọn phim</option>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))
          ) : (
            <option disabled>Không có phim nào</option>
          )}
        </select>

        <select
          value={newShowtime.cinemaId}
          onChange={(e) =>
            setNewShowtime({ ...newShowtime, cinemaId: e.target.value })
          }
          className="p-2 border rounded"
        >
          <option value="">Chọn rạp</option>
          {cinemas.length > 0 ? (
            cinemas.map((cinema) => (
              <option key={cinema.id} value={cinema.id}>
                {cinema.name}
              </option>
            ))
          ) : (
            <option disabled>Không có rạp nào</option>
          )}
        </select>

        <input
          type="time"
          value={newShowtime.time}
          onChange={(e) =>
            setNewShowtime({ ...newShowtime, time: e.target.value })
          }
          className="p-2 border rounded"
        />

        <input
          type="submit"
          value="Thêm suất chiếu"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
        />
      </div>
    </form>
  );
};

export default CreateShows;
