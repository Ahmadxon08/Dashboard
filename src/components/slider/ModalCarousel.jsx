/* eslint-disable react/prop-types */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import useMainStore from "../../store/useMainStore";
import "./ModalCarousel.scss";

const ModalCarousel = ({ imgs }) => {
  const { handleModalCarousel } = useMainStore((state) => ({
    handleModalCarousel: state.handleModalCarousel,
    openModalCarousel: state.openModalCarousel,
  }));
  return (
    <div className="modalCarousel" onClick={() => handleModalCarousel(false)}>
      <div
        style={{ width: "80%", height: "100%", margin: "0 auto" }}
        onClick={(e) => e.stopPropagation()}>
        <Swiper
          cssMode={true}
          navigation={true}
          pagination={{ clickable: true }}
          mousewheel={true}
          keyboard={true}
          loop={true}
          className="swipper"
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}>
          {imgs?.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="img-container">
                <img src={slide} alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ModalCarousel;
