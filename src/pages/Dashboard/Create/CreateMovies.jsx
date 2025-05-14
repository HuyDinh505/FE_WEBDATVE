import React, { useState } from "react";

const CreateMovies = () => {
  const [movieData, setMovieData] = useState({
    title: "",
    duration: "",
    releaseDate: "",
    description: "",
    genre: "",
    poster: "",
    trailer: "",
    actors: "",
    director: "",
  });

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Phim mới:", movieData);
    alert("Phim đã được tạo thành công!");
    // TODO: Gửi dữ liệu đến backend
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">🎬 Tạo phim mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên phim */}
        <div>
          <label className="block font-medium">Tên phim:</label>
          <input
            type="text"
            name="title"
            value={movieData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Thời lượng */}
        <div>
          <label className="block font-medium">Thời lượng (phút):</label>
          <input
            type="number"
            name="duration"
            value={movieData.duration}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Ngày phát hành */}
        <div>
          <label className="block font-medium">Ngày phát hành:</label>
          <input
            type="date"
            name="releaseDate"
            value={movieData.releaseDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Mô tả */}
        <div>
          <label className="block font-medium">Mô tả:</label>
          <textarea
            name="description"
            value={movieData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        {/* Thể loại */}
        <div>
          <label className="block font-medium">Thể loại:</label>
          <input
            type="text"
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Ảnh bìa */}
        <div>
          <label className="block font-medium">URL Ảnh bìa:</label>
          <input
            type="text"
            name="poster"
            value={movieData.poster}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Trailer */}
        <div>
          <label className="block font-medium">URL Trailer:</label>
          <input
            type="text"
            name="trailer"
            value={movieData.trailer}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Diễn viên */}
        <div>
          <label className="block font-medium">Diễn viên:</label>
          <input
            type="text"
            name="actors"
            value={movieData.actors}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Đạo diễn */}
        <div>
          <label className="block font-medium">Đạo diễn:</label>
          <input
            type="text"
            name="director"
            value={movieData.director}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Nút tạo phim */}
        <div>
          <input
            type="submit"
            value="Tạo phim"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateMovies;
