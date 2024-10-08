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

const ModalCarousel = ({ imgs }) => {
  const { handleModalCarousel } = useMainStore((state) => ({
    handleModalCarousel: state.handleModalCarousel,
    openModalCarousel: state.openModalCarousel,
  }));
  return (
    <div
      className="modal-overlay"
      onClick={() => handleModalCarousel(false)}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        padding: "10px",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        zIndex: 1000,
      }}>
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
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            padding: "5px",
          }}>
          {imgs?.map((slide, i) => (
            <SwiperSlide key={i}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  background: "#ccc",
                  borderRadius: "8px",
                  margin: "10px",
                }}>
                <img src={slide} alt="" width={"100%"} height={"100%"} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ModalCarousel;
