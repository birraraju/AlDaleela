import { Label } from "../../../../../components/ui/label";

export default function Props({ inputClicked, setInputClicked, setIscategory }) {
  return (
    <>
      {/* Search Icon */}
      <div className="relative z-[2]">
        <Label htmlFor="search" className="absolute mobile_s:-top-7 laptop_m:-top-[30px] left-3">
          <img
            src={`/Header/Searchbar/search-${inputClicked ? "black" : "white"}.svg`}
            alt=""
          />
        </Label>

        {/* Line */}
        <Label htmlFor="search" className="absolute mobile_s:-top-[30px] laptop_m:-top-[32px] left-12">
          <img
            src={`/Header/Searchbar/line-${inputClicked ? "black" : "white"}.svg`}
            alt=""
          />
        </Label>

        {/* Close */}
        {inputClicked && (
          <div
            onClick={() => {
              setInputClicked(false);
              setIscategory(false);
            }}
            className="absolute mobile_s:-top-7 laptop_m:-top-[30px] right-36 cursor-pointer"
          >
            <img src="/Header/Searchbar/close.svg" alt="" className="w-5" />
          </div>
        )}

        {/* Line */}
        {inputClicked && (
          <Label htmlFor="search" className="absolute mobile_s:-top-[30px] laptop_m:-top-[32px] right-32">
            <img src="/Header/Searchbar/line-black.svg" alt="" />
          </Label>
        )}
      </div>
    </>
  );
}
