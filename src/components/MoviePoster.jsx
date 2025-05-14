import { useState } from "react";
import { Link } from "react-router-dom";
import { PlayCircle } from "lucide-react"; // Import icon
import YouTube from "react-youtube";
import { imagePhim } from "../Utilities/common";

// const apiKey = import.meta.env.VITE_API_KEY;

const MoviePoster = ({ Phims }) => {
  const [trailer, setTrailer] = useState(null);

  if (!Phims) return <p>Không có dữ liệu phim.</p>;
  return (
    <div className="w-4/5 mx-auto px-4 py-6 bg-[#FDF7E5]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Phims?.map((phim) => (
          <div
            key={phim.ma_phim}
            className="flex flex-col group bg-gray-900 p-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            {/* Poster + Play Button */}
            <div className="relative w-full h-full overflow-hidden rounded-lg cursor-pointer">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={`${imagePhim}${phim.anh}`}
                alt={phim.title}
              />
              <button
                // onClick={() => fetchTrailer(movie.id)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition"
              >
                <PlayCircle size={50} className="text-white" />
              </button>
            </div>

            {/* Tiêu đề phim */}
            <p className="text-white text-center mt-3 font-bold text-lg">
              {phim.ten_phim}
            </p>

            {/* Nút Xem Chi Tiết + Mua Vé */}
            <div className="flex justify-center gap-2 mt-2">
              <Link to={`/phim/${phim.ma_phim}`}>
                <button className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 transition">
                  XEM CHI TIẾT
                </button>
              </Link>
              <Link to={`/ticket-booking/${phim.ma_phim}`}>
                <button className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition">
                  MUA VÉ
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Trailer */}
      {trailer && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-4/5 max-w-4xl p-4">
            <button
              className="absolute -top-6 -right-6 text-white text-3xl bg-red-600 rounded-full px-3 py-1 hover:bg-red-700"
              onClick={() => setTrailer(null)}
            >
              &times;
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <YouTube videoId={trailer} className="w-full h-full" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoviePoster;
