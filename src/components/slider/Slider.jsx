/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
// Slider.js
import { Carousel } from "react-responsive-carousel";
import "./Slider.scss";
import useMainStore from "../../store/useMainStore";
import ModalCarousel from "./ModalCarousel";

const Slider = ({ urls }) => {
  const { handleModalCarousel, openModalCarousel } = useMainStore((state) => ({
    handleModalCarousel: state.handleModalCarousel,
    openModalCarousel: state.openModalCarousel,
  }));
  const imageUrls = Array.isArray(urls)
    ? urls[0].split("][").map((url) => url.replace(/[\[\]]/g, ""))
    : urls.split("][").map((url) => url.replace(/[\[\]]/g, ""));

  const onChange = (index) => {
    console.log(`Slayd o'zgardi: ${index}`);
  };

  const onClickItem = (index) => {
    console.log(`Element bosildi: ${index}`);
  };

  const onClickThumb = (index) => {
    console.log(`Thumb bosildi: ${index}`);
  };

  const limitedImageUrls = imageUrls.slice(0, 7);

  return (
    <>
      <div className="contum_slider">
        <Carousel
          showArrows={true}
          showThumbs={true}
          onChange={onChange}
          onClickItem={onClickItem}
          onClickThumb={onClickThumb}>
          {limitedImageUrls.map((url, index) => (
            <div
              key={index}
              className="image_wrapper"
              onClick={() => handleModalCarousel(!openModalCarousel)}>
              <img src={url} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </Carousel>
      </div>
      {openModalCarousel && <ModalCarousel imgs={imageUrls} />}
    </>
  );
};

export default Slider;
