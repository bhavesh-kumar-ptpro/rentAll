import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import pic1 from './../../../../images/gallery/pic-1.jpg';
import pic2 from './../../../../images/gallery/pic-2.jpg';
import pic3 from './../../../../images/gallery/pic-3.jpg';
import pic4 from './../../../../images/gallery/pic-4.jpg';

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
  	<div className="owl-nav">
		<div className="owl-next fas fa-chevron-right"  onClick={onClick}/>
	</div>	
  );
}

function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
		<div className="owl-nav">
			<div className=" owl-prev fas fa-chevron-left" onClick={onClick} style={{zIndex:1}}/>
		</div>
    );
}


const GallerySlider = () =>{
	const settings = {
		dots: false,
		infinite: true,
		arrows: true,
		speed: 2500,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1600,
				settings: {
				  slidesToShow: 2,
				  slidesToScroll: 1,
				  
				},
			},
			{
				breakpoint: 400,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1,
				},
			},
		],
	};
	return(
		<>
			<Slider className="image-gallery owl-carousel" {...settings}>
				<div className="items px-3">
					<img src={pic1} alt="" className="w-100" />
				</div>
				<div className="items px-3">
					<img src={pic2} alt="" className="w-100"/>
				</div>
				<div className="items px-3">
					<img src={pic3} alt="" className="w-100"/>
				</div>
				<div className="items px-3">
					<img src={pic4} alt="" className="w-100"/>
				</div>
			</Slider>
		</>
	)
}
export default GallerySlider;