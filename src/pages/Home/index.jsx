import Banner from "../../components/Slides/Banner";

import MoviePoster from "../../components/MoviePoster";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/navbar";
import { useGetPhimUS } from "../../api/homepage";
// Đường dẫn tương đối

function Home() {
  const { data: Phims } = useGetPhimUS();

  if (!Phims) return <p>Loading...</p>;
  return (
    <div className="w-full bg-[#FDF7E5]">
      <Navbar />
      <Banner />
      <div className="container mx-auto px-4">
        <h1 className="text-black text-2xl text-center font-bold my-2 bg-[#FDF7E5]">
          PHIM ĐANG CHIẾU
        </h1>
        <MoviePoster Phims={Phims} />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
