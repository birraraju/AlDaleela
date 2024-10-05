export default function ProfileDetails({
  role,
  setIsPopoverOpen,
  setIsProfileData,
}) {
  return (
    <>
      {role !== null && (
        <div
          onClick={() => {
            setIsPopoverOpen(false);
            setIsProfileData(true);
          }}
          className="flex justify-start items-center gap-4"
        >
          <div>
            <img src="/Header/Profile/ProfileDetails/Profile.svg" alt="" />
          </div>

          <div className="flex flex-col cursor-pointer gap-1">
            <p className="font-bold text-black text-opacity-100 text-lg tracking-wider">
              Hamad mohammedsss
            </p>
            <p className="text-base">hamadmohammed@gmail.com</p>
          </div>
        </div>
      )}
    </>
  );
}
