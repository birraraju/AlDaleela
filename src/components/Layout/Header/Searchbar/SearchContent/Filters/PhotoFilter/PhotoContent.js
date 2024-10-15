export default function PhotoContent() {
  return (
    <div className="p-4 h-[17rem] overflow-y-scroll">
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, imageIndex) => (
          <div key={imageIndex} className="rounded-xl overflow-hidden">
            <img
              src={`${process.env.PUBLIC_URL}/Header/Searchbar/SearchContent/Photo/${image.imageName}`}
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const images = [
  { imageName: "image1.png" },
  { imageName: "image2.png" },
  { imageName: "image3.png" },
  { imageName: "image4.png" },
  { imageName: "image5.png" },
  { imageName: "image6.png" },
  { imageName: "image7.png" },
  { imageName: "image8.png" },
];
