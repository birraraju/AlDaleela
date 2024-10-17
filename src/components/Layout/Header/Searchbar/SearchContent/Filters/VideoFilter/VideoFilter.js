export default function VideoFilter({ setSelectedItem,isLangArab, setIsFiltersOpen, selectedItem }) {
  return (
    <div
      onClick={() => {
        setSelectedItem("video");
        setIsFiltersOpen("video");
      }}
      className={`px-2 py-1 rounded-full flex justify-center items-center gap-1 ${
        selectedItem === "video" ? "bg-white" : "bg-none opacity-50"
      }`}
    >
      <div>
        <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/video.svg`} alt="" className="w-6" />
      </div>
      <div>{isLangArab?"فيديو":"Video"}</div>
    </div>
  );
}






