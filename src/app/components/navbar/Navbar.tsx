import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-white/40 shadow-lg border-b border-white/20 flex justify-between items-center px-6 py-3 z-50 rounded-b-2xl">
      <h1 className="text-2xl font-bold text-black drop-shadow-md" style={{ fontFamily: 'Poppins' }}>
        Hear Me Yap
      </h1>
      <div className="flex items-center space-x-6 text-black text-lg">
        <span className="opacity-80 hover:opacity-100 transition cursor-pointer" >About</span>
        <Link href="/dashboard" className="px-5 py-2 rounded-full bg-white/20 hover:bg-white/30 transition shadow-md backdrop-blur-md">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;