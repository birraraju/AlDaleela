import React from 'react';

import WhatsAppSvg from '../../../assets/Droppedpin/WattsappIcon.svg';
import FaceBookSvg from '../../../assets/Droppedpin/FacebookIcon.svg';
import TwitterSvg from '../../../assets/Droppedpin/TwitterIcon.svg';
import GoogleMapSvg from '../../../assets/Droppedpin/mapicon.svg';
import InstgramSvg from '../../../assets/Droppedpin/instagramIcon.svg';
import CopyIconSvg from '../../../assets/Droppedpin/CopyIcon.svg';
import { ChevronLeft } from 'lucide-react';

const POIShareForm = ({ onClose }) => {
    const Links = [
        { src: WhatsAppSvg, name: "WhatsApp" },
        { src: FaceBookSvg, name: "Facebook" },
        { src: TwitterSvg, name: "X" },
        { src: GoogleMapSvg, name: "Google Map" },
        { src: InstgramSvg, name: "Instagram" },
    ];

    const shareUrl = "https://yourwebsite.com"; // The URL you want to share
    const message = "Check this out!"; // Custom message for WhatsApp or other platforms

    const handleShareClick = (name) => {
        switch (name) {
            case "WhatsApp":
                window.open(`https://wa.me/?text=${encodeURIComponent(message + " " + shareUrl)}`);
                break;
            case "Facebook":
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
                break;
            case "X":
                window.open(`https://twitter.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(message)}`);
                break;
            case "Google Map":
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Your Location")}`);
                break;
            case "Instagram":
                alert("Instagram doesn’t support direct sharing. Copy the link to share manually.");
                break;
            default:
                break;
        }
    };

    return (
        <div className='p-2 w-full'>
            <div>
                <button
                    onClick={onClose}
                    className="px-1 py-3 hover:text-blue-500 flex items-center text-black focus:outline-none"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
            </div>
            <div className='grid grid-cols-4 gap-7 justify-center items-center'>
                {Links.map((link, index) => (
                    <div key={index} onClick={() => handleShareClick(link.name)} className='flex w-16 flex-col justify-center items-center cursor-pointer'>
                        <img src={link.src} className='h-10 w-12 mb-1' alt={link.name} />
                        <h1 className='text-[#404040] text-[12px] font-medium text-center'>{link.name}</h1>
                    </div>
                ))}
            </div>
            <hr className='my-4' />
            <div className='flex justify-center items-center gap-2 cursor-pointer' onClick={() => navigator.clipboard.writeText(shareUrl)}>
                <img src={CopyIconSvg} alt="Copy Link" className='h-5 w-5' />
                <h2 className='text-blue-600 text-[12px] font-medium'>Copy Link</h2>
            </div>
        </div>
    );
};

export default POIShareForm;
