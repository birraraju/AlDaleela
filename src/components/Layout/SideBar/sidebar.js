import Home from "../../../assets/navigations/imageSide2.png";
import HomeSign from '../../../assets/navigations/imagesideHome.png';
import plusMinusBg from '../../../assets/navigations/imageSide1.png';
import PlusSign from '../../../assets/navigations/imagePlus.png';
import MinusSign from '../../../assets/navigations/imageMinus.png';
import Hand from '../../../assets/navigations/imagesideHand.png';
import LeftArrow from '../../../assets/navigations/imagesideLeftArrow.png';
import RightArrow from '../../../assets/navigations/imagesideRigthArrow.png'; // Fixed typo in variable name
import DashSign from '../../../assets/navigations/image.png';

export default function Component() {
  return (
    <div className="fixed left-4 ml-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center space-y-2 bg-transparent p-2 rounded-full">
      <button className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors duration-200">
        <img src={Home} alt="Home" className="w-10 h-10" />
        <div className="absolute py-6 flex-1 justify-between">
          <img src={HomeSign} alt="Home Sign" className="w-6" />
        </div>
      </button>

      <div className="w-12 text-white rounded-full flex flex-col items-center transition-colors duration-200">
        <button className="w-full h-8 my-10 flex items-center justify-center">
          <img src={plusMinusBg} alt="Plus Minus Background" className="relative w-10" />
          <div className="absolute py-6 flex-1 justify-between">
            <img src={PlusSign} alt="Plus Sign" className="w-6 -translate-y-5" />
            <img src={DashSign} alt="Dash Sign" className="w-6 -translate-y-2" />
            <img src={MinusSign} alt="Minus Sign" className="w-4 ml-1 translate-y-2" />
          </div>
        </button>
      </div>

      <button className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors duration-200">
        <img src={Home} alt="Home" className="w-10 h-10" />
        <div className="absolute py-6 flex-1 justify-between">
          <img src={Hand} alt="Hand" className="w-4 mr-1" />
        </div>
      </button>

      <button className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors duration-200">
        <img src={Home} alt="Home" className="w-10 h-10" />
        <div className="absolute py-6 flex-1 justify-between">
          <img src={RightArrow} alt="Right Arrow" className="w-3" />
        </div>
      </button>

      <button className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors duration-200">
        <img src={Home} alt="Home" className="w-10 h-10" />
        <div className="absolute py-6 flex-1 justify-between">
          <img src={LeftArrow} alt="Left Arrow" className="w-3 mr-1" />
        </div>
      </button>
    </div>
  );
}
