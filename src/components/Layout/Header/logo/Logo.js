import logo from "../../../../../src/assets/Whitelogo.svg";

export default function Logo() {
  return (
    <div className="w-40 h-8">
      <img
        src={logo}
        alt="Company Logo" // Update this to a meaningful description
        className="sm:translate-x-3 -translate-x-5 w-full h-full object-contain"
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop
          e.target.src = "path/to/fallback/logo.svg"; // Fallback logo path
        }}
      />
    </div>
  );
}
