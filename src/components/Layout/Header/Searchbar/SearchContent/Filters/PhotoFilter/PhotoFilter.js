import PhotoSvg from "../../../../../../../assets/Header/Searchbar/photo.svg"


export default function PhotoFilter({ setSelectedItem, setIsFiltersOpen, selectedItem }) {
  return (
    <div
      onClick={() => {
        setSelectedItem("photo");
        setIsFiltersOpen("photo");
      }}
      className={`px-2 py-1 rounded-full flex justify-center items-center gap-1 ${
        selectedItem === "photo" ? "bg-white" : "bg-none opacity-50"
      }`}
    >
      <div>
        {/* <img src="/Header/Searchbar/photo.svg" alt="" className="w-6" /> */}
        <img src={PhotoSvg} alt="" className="w-6" />

      </div>
      <div>Photo</div>
    </div>
  );
}
