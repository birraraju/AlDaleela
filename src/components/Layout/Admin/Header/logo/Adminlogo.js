import logo from "../../../../../assets/Whitelogo.svg";

export default function Logo() {
  return (
    <div className="w-40 h-8">
      <img src={logo} alt="Logo" className="w-full h-full object-contain" />
    </div>
  );
}
