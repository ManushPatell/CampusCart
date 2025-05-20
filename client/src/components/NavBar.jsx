export default function NavBar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <h1
        style={{ fontFamily: '"Press Start 2P", monospace' }}
        className="text-black text-center text-1xl"
      >
        
      </h1>
     


      {/* Navigation Links */}
      <div className="space-x-6 text-sm z-50 hidden md:flex">
        <a
          href="#"
          className="px-3 py-2 border-2 border-blue-200 text-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          Sign Up
        </a>
        <a
          href="#"
          className="px-3 py-2 border-2 border-blue-200 text-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          Login
        </a>
        <a
          href="#"
          className="px-3 py-2 border-2 border-blue-200 text-white hover:bg-blue-50 hover:text-black transition-colors duration-300"
        >
          About Us
        </a>
      </div>
    </nav>
  );
}
