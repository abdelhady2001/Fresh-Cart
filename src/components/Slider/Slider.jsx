
import Slider from 'react-slick';
import img1 from "../../assets/blog-img-2.jpeg"
import img2 from "../../assets/grocery-banner-2.jpeg"
import img3 from "../../assets/slider-image-3.jpeg"



// const images = Object.values(import.meta.glob('../../assets/portfolioImgs/*.{png,jpg,jpeg,PNG,JPEG}', { eager: true, as: 'url' }));


export default function MainSlider({data}) {
  var settings = {
    dots: false,
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ...{data}
  };
let imgs =[img1,img2,img3]
  return (
    <div className='hidden md:flex '>
      
      <div className="w-3/4">
      <Slider {...settings}>
        {imgs.map((img) => <img src={img} className='h-[400px] object-cover w-full ' alt="" />)}
      <img src={img1} className='h-[400px] object-cover w-full ' alt="" />
      <img src={img2} className='h-[400px] object-cover w-full' alt="" />
      <img src={img3} className='h-[400px] object-cover w-full' alt="" />
    </Slider>
      </div>
      <div className="w-1/4">
      <img src={img1} className='h-[200px] object-cover w-full ' alt="" />
      <img src={img2} className='h-[200px] object-cover w-full' alt="" />
      </div>
    </div>
  )
}
