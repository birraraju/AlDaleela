import { Button } from "../../../../../../../../components/ui/button";
import SucessSvg from "../../../../../../../../assets/Header/Profile/ProfileDetails/ChangePassword/Success.svg"

export default function SuccessMessage({ setIsProfile, setIsSuccess }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={SucessSvg}
        alt=""
      />
      <p className="font-medium text-xl text-center">
        New Password Changed Successfully
      </p>

      <Button
        onClick={() => {
          setIsProfile(true);
          setIsSuccess(false);
        }}
        className="mt-4 btn-gradient"
      >
        Done
      </Button>
    </div>
  );
}
