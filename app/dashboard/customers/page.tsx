"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import EditCustomerForm from '@/app/ui/customers/editdata';
import { CustomerField } from '@/app/lib/definitions';
import {fetchCustomers} from '@/app/lib/actions';

export default function Page() {
  const [customers, setCustomers] = useState<CustomerField[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<CustomerField | null>(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const fetchedCustomers = await fetchCustomers();
        setCustomers(fetchedCustomers);
      } catch (error) {
        console.error('Error loading customers:', error);
      }
    }
    loadCustomers();
  }, []);

  const handleEdit = (customer: CustomerField) => {
    setEditingCustomer(customer);
  };

  const handleSave = async (customer: CustomerField) => {
    // Implement save functionality as needed
  };

  const handleCancel = () => {
    setEditingCustomer(null);
  };

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
        <Link href="customers/createdata"> Create Customer
        </Link>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers ..." />
      </div>
      {editingCustomer ? (
        <EditCustomerForm
          customer={editingCustomer}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <Table customers={customers} onEdit={handleEdit} />
      )}
    </div>
  );
}
