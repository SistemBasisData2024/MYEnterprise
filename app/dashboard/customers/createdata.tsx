
"use client";

import React, { useEffect, useState } from 'react';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import CustomersTable from '@/app/ui/customers/createdata';

interface CustomerField {
  id: string;
  name: string;
  email: string;
  phone_number: string; 
}

interface FormattedCustomersTable extends CustomerField {
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
}

export default function Page() {
  const [customers, setCustomers] = useState<FormattedCustomersTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const fetchedCustomers: CustomerField[] = await fetchCustomers();
        console.log('Fetched customers:', fetchedCustomers);

        if (Array.isArray(fetchedCustomers)) {
          const formattedCustomers = fetchedCustomers.map(customer => ({
            ...customer,
            image_url: '/path/to/default/image.jpg', // Sesuaikan path ini
            total_invoices: Math.floor(Math.random() * 100), // Dummy data
            total_pending: `$${(Math.random() * 1000).toFixed(2)}`, // Dummy data
            total_paid: `$${(Math.random() * 1000).toFixed(2)}`, // Dummy data
          }));
          setCustomers(formattedCustomers);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err: any) {
        console.error('Error fetching customers:', err);

        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('Unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    }
    loadCustomers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading customers: {error.message}</p>;
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Customers', href: '/dashboard/customers', active: true },
        ]}
      />
      <CustomersTable customers={customers} />
    </main>
  );
}
