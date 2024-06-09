import { CustomerField } from '@/app/lib/definitions';

interface CustomersTableProps {
  customers: CustomerField[];
  onEdit: (customer: CustomerField) => void;
}

export default function CustomersTable({ customers, onEdit }: CustomersTableProps) {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Name</th>
          <th className="py-2">Email</th>
          <th className="py-2">Phone Number</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td className="py-2">{customer.name}</td>
            <td className="py-2">{customer.email}</td>
            <td className="py-2">{customer.phone_number}</td>
            <td className="py-2">
              <button onClick={() => onEdit(customer)}>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
