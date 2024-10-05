export default function AboutDescription() {
  return (
    <>
      <p className="font-semibold text-[#505050] text-lg my-6">
        Safeguarding Abu Dhabi's natural resources for a sustainable future.
      </p>

      <div>
        {content.map((item, index) => (
          <p key={index} className="text-base text-[#505050] font-normal">
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
