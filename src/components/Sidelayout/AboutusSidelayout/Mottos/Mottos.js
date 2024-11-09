import { useTheme } from '../../../Layout/ThemeContext/ThemeContext'; // Import your theme context

import vision from "../../../../assets/Header/Profile/Aboutus/vision.png"
import Mission from "../../../../assets/Header/Profile/Aboutus/mission.png"
import Values from "../../../../assets/Header/Profile/Aboutus/values.png"

export default function Mottos() {
  const { isDarkMode, isLangArab } = useTheme(); // Access dark mode from theme context

  return (
    <div className={`space-y-2 mt-2 flex flex-col  ${isLangArab?"gap-1":"gap-0"}` }>
      {aboutContent.map((content, index) => (
        <div
          key={index}
          className={`rounded-xl py-2 px-4 flex items-center justify-between gap-4  ${
            isDarkMode ? "bg-white bg-opacity-20 text-white" : "bg-white text-black"
          }`} // Adjust background and text colors based on dark mode
        >
          <div className="w-[20%]">
            <img
              src={content.image}
              alt=""
              className="w-8"
            />
          </div>

          <div className="w-[80%]">
            <h1 className={` font-semibold text-sm ${isDarkMode ? 'text-[#FFFFFFCC] text-opacity-80': 'text-gray-600'} `}>
            {isLangArab ? content.arabicTitle : content.title} {/* Display Arabic or English based on language state */}
            </h1>
            <p className={`text-xs font-normal  ${isLangArab?"leading-5":"leading-4"} mt-0 ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-gray-600'}`}>
            {isLangArab ? content.arabicDescription : content.description} {/* Display Arabic or English based on language state */}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const aboutContent = [
  {
    image: vision,
    title: "Our Vision",
    arabicTitle: "الرؤية",
    description:
      "A sustainable, well-protected and healthy environment that enhances quality of life.",
   arabicDescription:
   "الحياة جودة تعزز وصحية ومصانة مستدامة بيئة",
    },
  {
    image: Mission,
    title: "Our Mission",
    arabicTitle: 
    "الرسالة",
    description:
      "To protect the environment and promote sustainability through innovative environmental management, and impact-oriented policies and regulations, in collaboration with our partners and the broader community.",
      arabicDescription:
      "حماية البيئة وتعزيز الاستدامة من خلال الإدارة البيئية المبتكرة والسياسات والأنظمة الفعالة جنباً إلى جنب مع شركائنا والمجتمع"
    },
  {
    image: Values,
    title: "Our Values",
    arabicTitle: "القيــم",
    description:
      "Partnership & Teamwork, Initiative with Innovation, Excellence, Results-Oriented, Resilience, Ownership & Accountability",
      arabicDescription:
      "الشراكة والعمل الجماعي المبادرة والابتكار التميز العمل لتحقيق النتائج التكيف والمرونة المسؤولية والمساءلة"
    },
];
