import { useState } from 'react';
import { CustomerField } from '@/app/lib/definitions';

interface EditCustomerFormProps {
  customer: CustomerField;
  onSave: (customer: CustomerField) => void;
  onCancel: () => void;
}

export default function EditCustomerForm({ customer, onSave, onCancel }: EditCustomerFormProps) {
  const [formData, setFormData] = useState<CustomerField>(customer);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}
