export default function FilterBtn({ isFiltersOpen, setIsFiltersOpen, setSelectedItem }) {
  return (
    <>
      <div
        onClick={() => {
          setIsFiltersOpen("normal");
          setSelectedItem("normal");
        }}
        className="cursor-pointer"
      >
        <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/filter.svg"`} alt="" />
      </div>
    </>
  );
}
