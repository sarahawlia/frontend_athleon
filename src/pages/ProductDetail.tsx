import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { toast } from "sonner";
import futsalImg from "@/assets/category-futsal.jpg";
import padelImg from "@/assets/category-padel.jpg";
import basketImg from "@/assets/category-basket.jpg";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  // REPLACED: single mock product -> products list and selection by id
  const products = [
    {
      id: 1,
      sku: "FTL-001",
      name: "Jersey Futsal Pro Elite",
      price: 299000,
      category: "Futsal",
      image: futsalImg,
      stock: 24,
      material: "Polyester Microfiber (Breathable)",
      weight: "180g",
      care: "Machine wash cold, hang to dry",
      description:
        "Jersey futsal premium dengan bahan breathable dan moisture-wicking technology. Dirancang khusus untuk performa maksimal di lapangan. Material elastis memberikan kenyamanan dan fleksibilitas gerakan.",
      features: [
        "Bahan premium breathable",
        "Teknologi moisture-wicking",
        "Desain ergonomis",
        "Jahitan kuat dan rapi",
        "Anti-bakteri",
        "Quick dry technology",
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      sizeChart: [
        { size: "S", chest: "88-92", length: "68", shoulder: "42" },
        { size: "M", chest: "92-96", length: "70", shoulder: "44" },
        { size: "L", chest: "96-100", length: "72", shoulder: "46" },
        { size: "XL", chest: "100-104", length: "74", shoulder: "48" },
        { size: "XXL", chest: "104-108", length: "76", shoulder: "50" },
      ],
    },
    {
      id: 2,
      sku: "PDL-002",
      name: "Padel Training Set",
      price: 459000,
      category: "Padel",
      image: padelImg,
      stock: 12,
      material: "Polyester-Spandex Blend",
      weight: "250g (set)",
      care: "Machine wash cold, do not bleach",
      description:
        "Set training padel lengkap dengan bahan ringan dan elastis untuk mobilitas maksimal. Cocok untuk latihan intens dan permainan kompetitif.",
      features: ["Material ringan", "Stretchable", "Desain breathable", "Cepat kering"],
      sizes: ["S", "M", "L", "XL"],
      sizeChart: [
        { size: "S", chest: "86-90", length: "67", shoulder: "41" },
        { size: "M", chest: "90-94", length: "69", shoulder: "43" },
        { size: "L", chest: "94-98", length: "71", shoulder: "45" },
        { size: "XL", chest: "98-102", length: "73", shoulder: "47" },
      ],
    },
    {
      id: 3,
      sku: "BKT-003",
      name: "Basketball Jersey Classic",
      price: 349000,
      category: "Basket",
      image: basketImg,
      stock: 0,
      material: "Moisture-Wicking Polyester",
      weight: "200g",
      care: "Hand wash recommended, do not tumble dry",
      description:
        "Jersey basket klasik dengan potongan longgar dan bahan penyerap keringat. Cocok untuk latihan maupun pertandingan amatir.",
      features: ["Potongan longgar", "Bahan cepat kering", "Desain klasik"],
      sizes: ["M", "L", "XL", "XXL"],
      sizeChart: [
        { size: "M", chest: "94-98", length: "72", shoulder: "46" },
        { size: "L", chest: "98-102", length: "74", shoulder: "48" },
        { size: "XL", chest: "102-106", length: "76", shoulder: "50" },
        { size: "XXL", chest: "106-110", length: "78", shoulder: "52" },
      ],
    },
  ];

  const product = products.find((p) => p.id === Number(id)) || products[0];

  // Reset selected size & quantity when product changes so detail sesuai gambar
  useEffect(() => {
    setSelectedSize("");
    setQuantity(1);
  }, [product.id]);

  // REPLACED: handleAddToCart -> cek ukuran dan stok sebelum menambah
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Silakan pilih ukuran terlebih dahulu");
      return;
    }
    if (product.stock <= 0) {
      toast.error("Produk sedang habis");
      return;
    }
    if (quantity > product.stock) {
      toast.error(`Stok tidak mencukupi. Tersisa ${product.stock}`);
      return;
    }
    toast.success("Produk berhasil ditambahkan ke keranjang!");
  };

  // REPLACED: static relatedProducts -> derive from products array excluding current
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Beranda</Link>
            {" / "}
            <Link to="/catalog" className="hover:text-foreground">Katalog</Link>
            {" / "}
            <Link to={`/catalog?category=${product.category.toLowerCase()}`} className="hover:text-foreground">
              {product.category}
            </Link>
            {" / "}
            <span className="text-foreground">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-2">{product.category}</Badge>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-3xl font-bold text-primary">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>

                {/* ADDED: product metadata (SKU, stock, material, weight) */}
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>SKU: <span className="text-foreground font-medium">{product.sku}</span></span>
                  <span>
                    Stok:{" "}
                    <span className={`font-medium ${product.stock > 0 ? "text-foreground" : "text-red-500"}`}>
                      {product.stock > 0 ? `${product.stock} tersedia` : "Habis"}
                    </span>
                  </span>
                  <span>Material: <span className="text-foreground font-medium">{product.material}</span></span>
                  <span>Berat: <span className="text-foreground font-medium">{product.weight}</span></span>
                </div>
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              {/* Size Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Pilih Ukuran:</Label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="w-16"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Jumlah:</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1"
                  size="lg"
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {product.stock > 0 ? "Tambah ke Keranjang" : "Habis"}
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon" className="h-11 w-11">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Card className="mb-16">
            <CardContent className="p-6">
              <Tabs defaultValue="description">
                <TabsList className="mb-6">
                  <TabsTrigger value="description">Deskripsi</TabsTrigger>
                  <TabsTrigger value="size-chart">Size Chart</TabsTrigger>
                  <TabsTrigger value="features">Fitur</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-4">
                  <h3 className="text-lg font-semibold">Deskripsi Produk</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Jersey ini dirancang dengan teknologi terkini untuk memberikan kenyamanan maksimal saat beraktivitas. 
                    Bahan yang digunakan memiliki sirkulasi udara yang baik sehingga tetap sejuk meskipun digunakan dalam 
                    waktu yang lama. Cocok untuk latihan maupun pertandingan resmi.
                  </p>
                </TabsContent>
                
                <TabsContent value="size-chart">
                  <h3 className="text-lg font-semibold mb-4">Panduan Ukuran (cm)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">Size</th>
                          <th className="text-left p-3 font-semibold">Lingkar Dada</th>
                          <th className="text-left p-3 font-semibold">Panjang</th>
                          <th className="text-left p-3 font-semibold">Lebar Bahu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.sizeChart.map((row) => (
                          <tr key={row.size} className="border-b hover:bg-muted/50">
                            <td className="p-3 font-medium">{row.size}</td>
                            <td className="p-3">{row.chest} cm</td>
                            <td className="p-3">{row.length} cm</td>
                            <td className="p-3">{row.shoulder} cm</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * Toleransi ukuran ±1-2 cm
                  </p>
                </TabsContent>
                
                <TabsContent value="features" className="space-y-4">
                  <h3 className="text-lg font-semibold">Fitur Produk</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Produk Terkait</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{item.name}</h3>
                      <p className="text-lg font-bold text-primary">
                        Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);

export default ProductDetail;
