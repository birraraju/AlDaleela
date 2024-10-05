export default function Mottos() {
  return (
    <div className="space-y-4 mt-4">
      {aboutContent.map((content, index) => (
        <div
          key={index}
          className="bg-white rounded-xl py-2 px-4 flex items-center justify-between gap-4"
        >
          <div className="w-[20%]">
            <img
              src={`/Header/Profile/Aboutus/${content.image}`}
              alt=""
              className="w-12"
            />
          </div>

          <div className="w-[80%]">
            <h1 className="text-[#505050] font-semibold">{content.title}</h1>
            <p className="text-sm text-black font-normal mt-1">
              {content.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const aboutContent = [
  {
    image: "vision.png",
    title: "Our Vision",
    description:
      "A sustainable, well-protected and healthy environment that enhances quality of life.",
  },
  {
    image: "mission.png",
    title: "Our Mission",
    description:
      "To protect the environment and promote sustainability through innovative environmental management and impact-oriented policies and regulations, in collaboration with our partners and the broader community.",
  },
  {
    image: "values.png",
    title: "Our Values",
    description:
      "Partnership & Teamwork, Initiative with Innovation, Excellence, Results-Oriented, Resilience, Ownership & Accountability.",
  },
];
