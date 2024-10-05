import React, { useEffect, useRef } from "react";
import { X } from "lucide-react"; // Import the close icon
import "../../../../../../App.css"; // Import your CSS file

export default function GeneralInformation({ onClose }) {
  const modalRef = useRef(null); // Create a ref for the modal

  // Function to handle clicks outside the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Close the modal if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Add event listener for clicks

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="fixed inset-10 flex items-center justify-center z-10">
      <div className="fixed inset-10" onClick={onClose}></div> {/* Overlay to close on click */}
      <div
        ref={modalRef} // Attach the ref to the modal
        className="bg-white bg-opacity-98 border border-white p-4 rounded-lg shadow-lg relative text-black w-[800px] mb-10"
      >
        {/* Heading & close button */}
        <div>
          <h1 className="text-[24px] font-omnes font-medium">General Information</h1>
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Divider */}
        <div className="my-2 bg-black bg-opacity-10 h-[1px] w-full"></div>

        {/* Scrollable table with visible scrollbar */}
        <div className="scroll-container mr-1 h-[25rem] overflow-y-scroll">
          <table className="w-full mt-2 text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-[#667085] text-[14px] font-medium">S.No</th>
                <th className="px-4 py-2 text-left text-[#667085] text-[14px] font-medium">Class</th>
                <th className="px-4 py-2 text-left text-[#667085] text-[14px] font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-[#D5E5DE] bg-opacity-30" : ""}>
                  <td className="px-4 py-2 font-omnes font-medium text-[16px]">{index + 1}</td>
                  <td className="px-4 py-2 font-omnes font-medium text-[16px]">{row.class}</td>
                  <td className="px-4 py-2 font-omnes font-medium text-[16px]">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Define table data
const tableData = [
  {
    class: "Bohouth",
    description:
      "Searching means making an effort to reach something. He searches in the ground, meaning he digs a shallow hole. Searches are often in sandy ground, and the depth of the hole does not exceed the height of a man. Searches are not permanent (seasonal), and are dug after the rains and when water is needed.",
  },
  {
    class: "Bad",
    description:
      "Bid’a is something that he created or invented. Bid’a means digging it, and its plural is bid’u’. It means a new water well that is created (digged) in a place where there was no water well before. It is known who invented it, i.e. who (digged) it.",
  },
  {
    class: "Badira",
    description:
      "Plural: Badair, which is a form of high-altitude sand dune formation, which is higher than the surrounding sand dunes.",
  },
  {
    class: "Burqa",
    description:
      "It is a natural formation mixed with stone, sand and clay, and the lightning is prominent from the ground and its surroundings.",
  },
  {
    class: "Burka",
    description:
      "It is a low hole in the ground in the form of a basin, lined on the inside with stones or plaster, and used to collect and hold rainwater for a period of time. And its collection is (pools).",
  },
  {
    class: "Batha",
    description:
      "The plural is Batayeh, which is a flat and wide land in which the flood spreads, leaving behind coarse sand and gravel, and it extends for long distances.",
  },
  {
    class: "Batin / Bateen",
    description:
      "The ventricle is what is hidden from something. It is said that the ventricle is the side hidden from the prevailing wind direction and which affects the back of the ventricle. It is the side opposite the ventricle. Its diminutive is (butin).",
  },
];
