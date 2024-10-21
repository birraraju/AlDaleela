import React from 'react';
import Book1 from '../../../assets/bookmarks/imageBook1.png';
import Book2 from '../../../assets/bookmarks/imageBook2.png';
import Book3 from '../../../assets/bookmarks/imageBook3.png';
import Book4 from '../../../assets/bookmarks/imageBook4.png';
import Book5 from '../../../assets/bookmarks/imageBook5.png';
// import BookMarkGreem from '../../../assets/bookmarks/imageBookMarkGreen.png';
import CemaraBg from '../../../assets/bookmarks/imageCamerBg.png';
import CameraIcon from '../../../assets/bookmarks/imageCameraIcon.png';
import VideoIcon from '../../../assets/bookmarks/imageVideoIcon.png';
import AudioIcon from '../../../assets/bookmarks/imageMusicIcon.png';
import VideoBg from '../../../assets/bookmarks/imageVideoBg.png';
import AudioBg from '../../../assets/bookmarks/imageMusicBg.png';
import BookYellow from '../../../assets/bookmarks/imageBookYellow.png';

const Popup1 = ({isManageVisible}) => {

  // Array of images with icons
  const images = [
    { src: Book1, title: 'Maskar Al Hidaybah', icon: [{ iconBg: CemaraBg, Icon: CameraIcon }, { iconBg: VideoBg, Icon: VideoIcon }, { iconBg: AudioBg, Icon: AudioIcon }] },
    { src: Book2, title: "Al 'Imayrah", icon: [{ iconBg: AudioBg, Icon: AudioIcon }] },
    { src: Book3, title: 'Qassar Afij', icon: [{ iconBg: AudioBg, Icon: AudioIcon }, { iconBg: VideoBg, Icon: VideoIcon }] },
    { src: Book4, title: 'Sat-h Al Bateel', icon: [{ iconBg: VideoBg, Icon: VideoIcon }] },
    { src: Book5, title: 'Jazeerat Um Al Nar', icon: [{ iconBg: CemaraBg, Icon: CameraIcon }] },
  ];


  return (
    <div className="relative">
          <div className="grid grid-cols-3 justify-start pt-3  items-start gap-y-4 gap-x-0">
            {images.map((image, index) => (
              <div key={index} className="relative w-28 h-24 flex flex-col items-center">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover shadow-xl rounded-md"
                />
                <h3 className="text-start w-full border text-white text-xs border-transparent rounded-md absolute bg-[#504848] h-6 justify-start items-center pl-2 flex bottom-0 text-[9px] leading-4 break-words">
                  {image.title}
                </h3>

                {isManageVisible && <img src={BookYellow} className='absolute h-5 shadow-black top-1 right-3' alt="" />}

                <div className="absolute w-full pl-1 bottom-4 flex">
                  {/* Render icons */}
                  {image.icon.map((icons, iconIndex) => (
                    <span
                      className="relative p-[3%] bg-[#504848] border-[#504848] rounded-full"
                      key={iconIndex}
                    >
                      <img src={icons.iconBg} className="relative h-4 w-4" alt="Icon Background" />
                      <img src={icons.Icon} className="absolute top-1.5 left-1.5 h-2 w-2.5" alt="Icon" />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>)
};

export default Popup1;
