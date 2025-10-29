import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function AdminPaymentMethods() {
  const [payments, setPayments] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'bank',
    account_number: '',
    account_name: '',
    instructions: '',
    is_active: true,
  });

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Gagal memuat metode pembayaran');
    } else {
      setPayments(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingPayment) {
      const { error } = await supabase
        .from('payment_methods')
        .update(formData)
        .eq('id', editingPayment.id);

      if (error) {
        toast.error('Gagal update metode pembayaran');
      } else {
        toast.success('Metode pembayaran berhasil diupdate');
        setIsDialogOpen(false);
        loadPayments();
        resetForm();
      }
    } else {
      const { error } = await supabase
        .from('payment_methods')
        .insert([formData]);

      if (error) {
        toast.error('Gagal menambah metode pembayaran');
      } else {
        toast.success('Metode pembayaran berhasil ditambahkan');
        setIsDialogOpen(false);
        loadPayments();
        resetForm();
      }
    }
  };

  const handleEdit = (payment: any) => {
    setEditingPayment(payment);
    setFormData({
      name: payment.name,
      type: payment.type,
      account_number: payment.account_number || '',
      account_name: payment.account_name || '',
      instructions: payment.instructions || '',
      is_active: payment.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus metode pembayaran ini?')) {
      const { error } = await supabase.from('payment_methods').delete().eq('id', id);
      
      if (error) {
        toast.error('Gagal menghapus metode pembayaran');
      } else {
        toast.success('Metode pembayaran berhasil dihapus');
        loadPayments();
      }
    }
  };

  const resetForm = () => {
    setEditingPayment(null);
    setFormData({
      name: '',
      type: 'bank',
      account_number: '',
      account_name: '',
      instructions: '',
      is_active: true,
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Metode Pembayaran</h1>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Tambah Metode
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingPayment ? 'Edit Metode' : 'Tambah Metode'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="type">Tipe</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="ewallet">E-Wallet</SelectItem>
                      <SelectItem value="credit_card">Kartu Kredit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="account_number">Nomor Rekening/Akun</Label>
                  <Input
                    id="account_number"
                    value={formData.account_number}
                    onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="account_name">Nama Pemilik</Label>
                  <Input
                    id="account_name"
                    value={formData.account_name}
                    onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="instructions">Instruksi Pembayaran</Label>
                  <Textarea
                    id="instructions"
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    rows={3}
                  />
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  />
                  <span>Aktif</span>
                </label>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button type="submit">{editingPayment ? 'Update' : 'Tambah'}</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Nomor Akun</TableHead>
              <TableHead>Nama Pemilik</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.name}</TableCell>
                <TableCell className="capitalize">{payment.type.replace('_', ' ')}</TableCell>
                <TableCell>{payment.account_number || '-'}</TableCell>
                <TableCell>{payment.account_name || '-'}</TableCell>
                <TableCell>{payment.is_active ? 'Aktif' : 'Nonaktif'}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(payment)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(payment.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
}
