import { Button } from "../../../../../../../../ui/button";
import FailureSvg from "../../../../../../../../../assets/Header/Profile/ProfileDetails/ChangePassword/Failure.svg"

export default function FailureMessage({ setIsProfile, setIsFailure }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={FailureSvg}
        alt=""
      />
      <p className="font-medium text-xl text-center">
        Failed to Change Password !
      </p>

      <Button
        onClick={() => {
          setIsProfile(true);
          setIsFailure(false);
        }}
        className="mt-4 btn-gradient"
      >
        Done
      </Button>
    </div>
  );
}
