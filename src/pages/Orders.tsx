import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: number;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: string[];
}

const Orders = () => {
  const orders: Order[] = [
    {
      id: 1001,
      date: "2025-01-08",
      total: 648000,
      status: "shipped",
      items: ["Jersey Futsal Pro Elite", "Basketball Jersey Classic"],
    },
    {
      id: 1002,
      date: "2025-01-10",
      total: 399000,
      status: "processing",
      items: ["Pro Swimming Suit"],
    },
    {
      id: 1003,
      date: "2025-01-05",
      total: 349000,
      status: "delivered",
      items: ["Badminton Competition Set"],
    },
    {
      id: 1004,
      date: "2025-01-12",
      total: 459000,
      status: "pending",
      items: ["Padel Training Set"],
    },
    {
      id: 1005,
      date: "2025-01-03",
      total: 279000,
      status: "cancelled",
      items: ["Futsal Training Set Women"],
    },
  ];

  const getStatusBadge = (status: Order["status"]) => {
    const variants: Record<Order["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "Belum Dibayar", variant: "outline" },
      processing: { label: "Dikemas", variant: "secondary" },
      shipped: { label: "Dikirim", variant: "default" },
      delivered: { label: "Selesai", variant: "default" },
      cancelled: { label: "Dibatalkan", variant: "destructive" },
    };
    
    const { label, variant } = variants[status];
    return <Badge variant={variant}>{label}</Badge>;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8">Status Pesanan</h1>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">Belum ada pesanan</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm">• {item}</p>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4">
                      <p className="text-lg font-bold text-primary">
                        Total: Rp {order.total.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
