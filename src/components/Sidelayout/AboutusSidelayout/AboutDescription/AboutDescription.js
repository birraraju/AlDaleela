import { useTheme } from "../../../Layout/ThemeContext/ThemeContext"; // Import the theme context

export default function AboutDescription() {
  const { isDarkMode } = useTheme(); // Access dark mode state

  return (
    <>
      <p className={`font-omnes text-[14px] font-semibold my-6 laptop_s:my-2 ${isDarkMode ? 'text-[#FFFFFFCC] text-opacity-80' : 'text-[#505050]'} leading-5 mb-3`}>
        Safeguarding Abu Dhabi's natural resources for a sustainable future.
      </p>

      <div className="">
        {content.map((item, index) => (
          <p key={index} className={`bg-fontFamily-poppins-0 font-[400px] text-[12px] ${isDarkMode ? 'text-[#FFFFFFCC]' : 'text-[#505050]'} leading-5`}>
            {item.description}
          </p>
        ))}
      </div>
    </>
  );
}

const content = [
  {
    description:
      "EAD regulates and enforces Abu Dhabi's environmental laws to protect biodiversity and preserve the quality of life for a sustainable future.",
  },
  {
    description:
      "Starting as a small group of pioneering ecologists in 1996 working in the harsh desert environment, we have grown - breaking down barriers and pushing the limits of science and conservation.",
  },
  {
    description:
      "We are now the largest environmental regulator in the Middle East, continuing the strong legacy of the late Sheikh Zayed bin Sultan Al Nahyan by exemplifying his values of conservation.",
  },
  {
    description:
      "Our proudest achievements include setting up the Sheikh Zayed Protected Areas Network, recording 100 unknown invertebrate species and leading the region in banning gargour fishing nets – while our mandate is focused on regulation and direction of policy with transparency.",
  },
  {
    description:
      "But our work doesn't stop there. It's as much about the future as it is about the past.",
  },
];
