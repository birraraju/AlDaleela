import { useAuth } from "../../../../../../../Providers/AuthProvider/AuthProvider";
export default function ProfileDetails({
  role,
  setIsPopoverOpen,
  setIsProfileData,
}) {
  const {profiledetails , setprofiledetails} = useAuth()
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
            <img src={`${process.env.PUBLIC_URL}/Header/Profile/ProfileDetails/Profile.svg`} alt="" />
          </div>

          <div className="flex flex-col cursor-pointer gap-1">
            <p className="font-bold text-black text-opacity-100 text-lg tracking-wider">
              {profiledetails.username}
            </p>
            <p className="text-base">{profiledetails.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
