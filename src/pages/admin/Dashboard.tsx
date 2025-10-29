import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [popularProducts, setPopularProducts] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
    loadPopularProducts();
  }, []);

  const loadStats = async () => {
    const [productsRes, ordersRes, usersRes] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id, total_amount', { count: 'exact' }),
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
    ]);

    const totalRevenue = ordersRes.data?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

    setStats({
      totalProducts: productsRes.count || 0,
      totalOrders: ordersRes.count || 0,
      totalUsers: usersRes.count || 0,
      totalRevenue,
    });
  };

  const loadPopularProducts = async () => {
    const { data } = await supabase
      .from('order_items')
      .select('product_id, product_name, quantity')
      .limit(10);

    if (data) {
      const productMap = new Map();
      data.forEach(item => {
        const current = productMap.get(item.product_id) || { name: item.product_name, total: 0 };
        current.total += item.quantity;
        productMap.set(item.product_id, current);
      });

      const sorted = Array.from(productMap.values())
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

      setPopularProducts(sorted);
    }
  };

  const statCards = [
    { icon: Package, label: 'Total Produk', value: stats.totalProducts, color: 'text-blue-600' },
    { icon: ShoppingCart, label: 'Total Pesanan', value: stats.totalOrders, color: 'text-green-600' },
    { icon: Users, label: 'Total Pengguna', value: stats.totalUsers, color: 'text-purple-600' },
    { icon: DollarSign, label: 'Total Pendapatan', value: `Rp ${stats.totalRevenue.toLocaleString('id-ID')}`, color: 'text-orange-600' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Produk Populer</CardTitle>
          </CardHeader>
          <CardContent>
            {popularProducts.length > 0 ? (
              <div className="space-y-4">
                {popularProducts.map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-muted-foreground">{product.total} terjual</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Belum ada data penjualan</p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
