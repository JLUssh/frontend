import "./index.css";

export default function Mask({ handleClick }) {
  return (
    <div
      onClick={handleClick}
      className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"
    ></div>
  );
}
