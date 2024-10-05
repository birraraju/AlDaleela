import feedback from "../../../../../../../assets/feedback.svg";

export default function SendFeedback({ setIsFeedBack, setIsPopoverOpen }) {
  return (
    <div
      className="py-4 cursor-pointer"
      onClick={() => {
        setIsFeedBack(true);
        setIsPopoverOpen(false);
      }}
    >
      <div className="flex justify-start gap-2 items-center">
        <div>
          <img src={feedback} alt="Logo" className="w-6 mr-1" />
        </div>
        <p className="font-medium font-omnes text-[#505050] text-[18px]">Send Feedback</p>
      </div>
    </div>
  );
}
