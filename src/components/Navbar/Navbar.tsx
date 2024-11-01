import logo from "../../assets/logo.svg";

export const Navbar = () => {
  return (
    <nav role="navigation" className="flex gap-2 p-4 items-center bg-white border-b-2 border-gray-200">
      <img src={logo} alt="Productive logo" />
      <h1 className="text-primary font-medium">Time Tracker</h1>
    </nav>
  );
};
