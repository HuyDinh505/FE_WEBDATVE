import React from "react";
import { useQuery } from "@tanstack/react-query";
import MoviePoster from "../../components/MoviePoster";
import { getPhimSapChieu } from "../../api/phimApi";

const PhimSapChieu = () => {
  const { data: Phims } = useQuery({
    queryKey: ["phim-sap-chieu"],
    queryFn: getPhimSapChieu,
  });

  if (!Phims) return <p>Loading...</p>;

  return (
    <div className="w-full bg-[#FDF7E5]">
      <div className="container mx-auto px-4">
        <h1 className="text-black text-2xl text-center font-bold py-8">
          PHIM SẮP CHIẾU
        </h1>
        <MoviePoster Phims={Phims} />
      </div>
    </div>
  );
};

export default PhimSapChieu;
