import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import futsalImg from "@/assets/category-futsal.jpg";
import padelImg from "@/assets/category-padel.jpg";
import basketImg from "@/assets/category-basket.jpg";
import renangImg from "@/assets/category-renang.jpg";
import esportImg from "@/assets/category-esport.jpg";
import badmintonImg from "@/assets/category-badminton.jpg";

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");

  const products = [
    { id: 1, name: "Jersey Futsal Pro Elite", price: 299000, image: futsalImg, category: "Futsal", gender: "pria" },
    { id: 2, name: "Futsal Training Set Women", price: 279000, image: futsalImg, category: "Futsal", gender: "wanita" },
    { id: 3, name: "Padel Training Set", price: 459000, image: padelImg, category: "Padel", gender: "pria" },
    { id: 4, name: "Padel Competition Wear", price: 489000, image: padelImg, category: "Padel", gender: "wanita" },
    { id: 5, name: "Basketball Jersey Classic", price: 349000, image: basketImg, category: "Basket", gender: "pria" },
    { id: 6, name: "Basketball Performance Set", price: 329000, image: basketImg, category: "Basket", gender: "wanita" },
    { id: 7, name: "Pro Swimming Suit", price: 399000, image: renangImg, category: "Renang", gender: "wanita" },
    { id: 8, name: "Swimming Performance Gear", price: 429000, image: renangImg, category: "Renang", gender: "pria" },
    { id: 9, name: "Esport Gaming Jersey", price: 259000, image: esportImg, category: "Esport", gender: "pria" },
    { id: 10, name: "Esport Pro Team Shirt", price: 249000, image: esportImg, category: "Esport", gender: "wanita" },
    { id: 11, name: "Badminton Competition Set", price: 369000, image: badmintonImg, category: "Badminton", gender: "pria" },
    { id: 12, name: "Badminton Training Wear", price: 349000, image: badmintonImg, category: "Badminton", gender: "wanita" },
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory;
    const genderMatch = selectedGender === "all" || product.gender === selectedGender;
    return categoryMatch && genderMatch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Katalog Produk</h1>
          
          {/* Filters */}
          <div className="bg-card rounded-lg p-6 shadow-card mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Filter</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Kategori</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="futsal">Futsal</SelectItem>
                    <SelectItem value="padel">Padel</SelectItem>
                    <SelectItem value="basket">Basket</SelectItem>
                    <SelectItem value="renang">Renang</SelectItem>
                    <SelectItem value="esport">Esport</SelectItem>
                    <SelectItem value="badminton">Badminton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Jenis Kelamin</label>
                <Select value={selectedGender} onValueChange={setSelectedGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="pria">Pria</SelectItem>
                    <SelectItem value="wanita">Wanita</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedGender("all");
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="mb-4">
            <p className="text-muted-foreground">
              Menampilkan {filteredProducts.length} produk
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Tidak ada produk yang ditemukan</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;
