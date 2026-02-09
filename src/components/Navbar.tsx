import { Lock, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

type NavbarProps = {
  cartCount?: number;
};

export function Navbar({ cartCount = 0 }: NavbarProps) {
  return (
    <nav className="bg-black/90 backdrop-blur border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO / TÍTULO */}
        <Link to="/" className="flex items-center gap-3">
          <Lock className="h-9 w-9 text-blue-500" />
          <span className="text-white font-semibold text-lg">
            Fechaduras Hotel
          </span>
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-8">
          <Link
            to="/produtos"
            className="text-gray-300 hover:text-blue-400 transition font-medium"
          >
            Produtos
          </Link>

          <Link
            to="/checkout"
            className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            <ShoppingCart className="text-white" />

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}
