import { useState, useEffect } from "react";

const API_KEY = "d04c6fe19f7147b9ca52f61fd8c472c9";
const BASE_URL = "https://api.themoviedb.org/3";

const ManageMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=vi-VN`
        );
        if (!response.ok) throw new Error("Lỗi API");
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading)
    return (
      <p className="text-center text-lg text-gray-600">Đang tải dữ liệu...</p>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Quản lý phim</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Hình ảnh</th>
              <th className="py-3 px-4 text-left">Tiêu đề</th>
              <th className="py-3 px-4 text-center">Ngày phát hành</th>
              <th className="py-3 px-4 text-center">Đánh giá</th>
              <th className="py-3 px-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                    className="w-16 h-24 rounded-md"
                  />
                </td>
                <td className="py-3 px-4">{movie.title}</td>
                <td className="py-3 px-4 text-center">{movie.release_date}</td>
                <td className="py-3 px-4 text-center font-semibold text-yellow-600">
                  {movie.vote_average}
                </td>
                <td className="py-3 px-4 text-center">
                  <form>
                    <input
                      type="submit"
                      value="Chỉnh sửa"
                      className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm cursor-pointer hover:bg-blue-600"
                    />
                    <input
                      type="submit"
                      value="Xóa"
                      className="bg-red-500 text-white px-3 py-2 rounded-md text-sm ml-2 cursor-pointer hover:bg-red-600"
                    />
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMovies;
