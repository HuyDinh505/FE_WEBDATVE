import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade"; // Thêm hiệu ứng fade
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import hinh1 from "../../assets/hinh1.png";
import hinh2 from "../../assets/hinh2.jpg";
import hinh3 from "../../assets/hinh3.png";
import hinh4 from "../../assets/hinh4.jpg";
import hinh5 from "../../assets/hinh5.png";
import hinh6 from "../../assets/hinh6.png";
import hinh7 from "../../assets/hinh7.jpg";

const Banner = () => {
  return (
    <div className="w-4/5 mx-auto mt-6 px-4">
      <Swiper
        navigation={true}
        effect="fade" // Thêm hiệu ứng fade
        modules={[Navigation, Autoplay, EffectFade]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        className="rounded-lg overflow-hidden shadow-lg"
      >
        {[hinh1, hinh2, hinh3, hinh4, hinh5, hinh6, hinh7].map(
          (hinh, index) => (
            <SwiperSlide key={index}>
              <img
                src={hinh}
                alt={`slide-${index}`}
                className="object-cover w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px]"
              />
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default Banner;
