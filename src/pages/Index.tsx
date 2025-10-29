import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import heroBanner from "@/assets/hero-banner.jpg";
import futsalImg from "@/assets/category-futsal.jpg";
import padelImg from "@/assets/category-padel.jpg";
import basketImg from "@/assets/category-basket.jpg";
import renangImg from "@/assets/category-renang.jpg";
import esportImg from "@/assets/category-esport.jpg";
import badmintonImg from "@/assets/category-badminton.jpg";

const Index = () => {
  const categories = [
    { name: "Futsal", image: futsalImg, slug: "futsal" },
    { name: "Padel", image: padelImg, slug: "padel" },
    { name: "Basket", image: basketImg, slug: "basket" },
    { name: "Renang", image: renangImg, slug: "renang" },
    { name: "Esport", image: esportImg, slug: "esport" },
    { name: "Badminton", image: badmintonImg, slug: "badminton" },
  ];

  const bestSellers = [
    { id: 1, name: "Jersey Futsal Pro Elite", price: 299000, image: futsalImg, category: "Futsal" },
    { id: 2, name: "Padel Training Set", price: 459000, image: padelImg, category: "Padel" },
    { id: 3, name: "Basketball Jersey Classic", price: 349000, image: basketImg, category: "Basket" },
    { id: 4, name: "Pro Swimming Suit", price: 399000, image: renangImg, category: "Renang" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <img 
            src={heroBanner} 
            alt="Sports apparel collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
                  Koleksi Pakaian Sport Terbaru
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
                  Kualitas terbaik untuk performa maksimal di setiap olahraga
                </p>
                <Link to="/catalog">
                  <Button size="lg" variant="secondary">
                    Belanja Sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Kategori Olahraga</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/catalog?category=${category.slug}`}
                  className="group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden shadow-card bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-center mt-3 font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold">Produk Terlaris</h2>
              <Link to="/catalog">
                <Button variant="outline">Lihat Semua</Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Siap Untuk Meningkatkan Performa?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Dapatkan pakaian olahraga berkualitas tinggi dengan harga terbaik
            </p>
            <Link to="/catalog">
              <Button size="lg" variant="secondary">
                Mulai Belanja
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
