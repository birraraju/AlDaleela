export default function VideoContent() {
  return (
    <div className="p-4 h-[17rem] overflow-y-scroll">
      <div className="grid grid-cols-4 gap-2">
        {videos.map((video, videoIndex) => (
          <div key={videoIndex} className="relative bg-black rounded-xl overflow-hidden">
            <video
              src={`${process.env.PUBLIC_URL}/Header/Searchbar/SearchContent/Video/${video.videoName}`}
              className="w-full h-auto"
            ></video>
            <button className="absolute inset-0 flex items-center justify-center">
              <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/playBtn.svg`} alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const videos = [
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
  { videoName: "video1.mp4" },
];
