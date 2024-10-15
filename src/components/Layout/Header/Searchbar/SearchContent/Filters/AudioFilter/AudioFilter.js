export default function AudioFilter({ setSelectedItem, setIsFiltersOpen, selectedItem }) {
  return (
    <div
      onClick={() => {
        setSelectedItem("audio");
        setIsFiltersOpen("audio");
      }}
      className={`px-2 py-1 rounded-full flex justify-center items-center gap-1 ${
        selectedItem === "audio" ? "bg-white" : "bg-none opacity-50"
      }`}
    >
      <div>
        <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/audio.svg`} alt="" className="w-6" />
      </div>
      <div>Audio</div>
    </div>
  );
}
