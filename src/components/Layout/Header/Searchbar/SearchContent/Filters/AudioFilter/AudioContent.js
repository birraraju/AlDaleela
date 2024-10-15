export default function AudioContent() {
  return (
    <div className="p-4 h-[17rem] overflow-y-scroll">
      <div className="grid grid-cols-4 gap-2">
        {audios.map((audio, audioIndex) => (
          <div
            key={audioIndex}
            className="bg-white p-2 rounded-xl overflow-hidden"
          >
            <p className="text-xs whitespace-nowrap font-medium truncate mb-4">
              {audio.audioName}
            </p>

            <div className="flex justify-between items-center gap-2">
              <div className="flex justify-start items-center gap-2">
                <div>
                  <img
                    src={`${process.env.PUBLIC_URL}/Header/Searchbar/music.svg`}
                    alt=""
                    className="w-4"
                  />
                </div>
                <div>
                  <img src={`${process.env.PUBLIC_URL}/Header/Searchbar/audioWave.svg`} alt="" />
                </div>
              </div>

              <div className="text-xs text-black text-opacity-50">{audio.audioSec}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const audios = [
  {
    audioName: "Maskar Al Hidaybah",
    audioSec: "12:00",
  },
  {
    audioName: "Al'Imayrah",
    audioSec: "12:00",
  },
  {
    audioName: "Qassar Afij",
    audioSec: "12:00",
  },
  {
    audioName: "Sat-h Al Bateel",
    audioSec: "12:00",
  },
  {
    audioName: "Jazeerat Um Al Nar",
    audioSec: "12:00",
  },
  {
    audioName: "Ras Ar Rive Ah",
    audioSec: "12:00",
  },
];
