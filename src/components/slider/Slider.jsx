/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
import { Carousel } from "react-responsive-carousel";
import "./Slider.scss";

const Slider = ({ urls }) => {
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
    <div className="contum_slider">
      <Carousel
        showArrows={true}
        showThumbs={true}
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}>
        {limitedImageUrls?.map((url, index) => (
          <div key={index} className="image_wrapper">
            <img src={url} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
