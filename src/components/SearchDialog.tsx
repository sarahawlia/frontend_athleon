import { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import futsalImg from "@/assets/category-futsal.jpg";
import padelImg from "@/assets/category-padel.jpg";
import basketImg from "@/assets/category-basket.jpg";
import renangImg from "@/assets/category-renang.jpg";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = [
    { id: 1, name: "Jersey Futsal Pro Elite", price: 299000, image: futsalImg, category: "Futsal" },
    { id: 2, name: "Futsal Training Set Women", price: 279000, image: futsalImg, category: "Futsal" },
    { id: 3, name: "Padel Training Set", price: 459000, image: padelImg, category: "Padel" },
    { id: 4, name: "Padel Competition Wear", price: 489000, image: padelImg, category: "Padel" },
    { id: 5, name: "Basketball Jersey Classic", price: 349000, image: basketImg, category: "Basket" },
    { id: 6, name: "Basketball Performance Set", price: 329000, image: basketImg, category: "Basket" },
    { id: 7, name: "Pro Swimming Suit", price: 399000, image: renangImg, category: "Renang" },
    { id: 8, name: "Swimming Performance Gear", price: 429000, image: renangImg, category: "Renang" },
  ];

  const filteredProducts = searchQuery
    ? allProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Cari Produk</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari produk atau kategori..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {searchQuery === "" && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Ketik untuk mencari produk</p>
            </div>
          )}

          {searchQuery !== "" && filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Tidak ada produk yang ditemukan</p>
            </div>
          )}

          {filteredProducts.length > 0 && (
            <div className="space-y-2 mt-4">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-4 p-3 hover:bg-muted rounded-lg transition-colors"
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <p className="font-bold text-primary">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
