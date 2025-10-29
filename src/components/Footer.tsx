import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-4">SportWear</h3>
            <p className="text-sm text-primary-foreground/80">
              Pakaian olahraga berkualitas untuk setiap atlet.
            </p>
          </div>

          {/* Kategori */}
          <div>
            <h4 className="font-semibold mb-4">Kategori</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/catalog?category=futsal" className="hover:text-primary-foreground">Futsal</Link></li>
              <li><Link to="/catalog?category=padel" className="hover:text-primary-foreground">Padel</Link></li>
              <li><Link to="/catalog?category=basket" className="hover:text-primary-foreground">Basket</Link></li>
              <li><Link to="/catalog?category=renang" className="hover:text-primary-foreground">Renang</Link></li>
              <li><Link to="/catalog?category=esport" className="hover:text-primary-foreground">Esport</Link></li>
              <li><Link to="/catalog?category=badminton" className="hover:text-primary-foreground">Badminton</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/profile" className="hover:text-primary-foreground">Profil Saya</Link></li>
              <li><Link to="/orders" className="hover:text-primary-foreground">Status Pesanan</Link></li>
              <li><Link to="/cart" className="hover:text-primary-foreground">Keranjang</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-primary-foreground/80 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; 2025 SportWear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
