import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { CustomerField } from '@/app/lib/definitions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { name, email, phone_number }: CustomerField = req.body;

  if (req.method === 'PUT') {
    if (!id || typeof id !== 'string') {
      res.status(400).json({ error: "Invalid or missing id" });
      return;
    }

    try {
      const result = await sql`
        UPDATE customers
        SET name = ${name}, email = ${email}, phone_number = ${phone_number}
        WHERE id = ${id}
        RETURNING *;
      `;
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Customer not found" });
        return;
      }
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Database Error:", error);
      res.status(500).json({ error: "Failed to update customer" });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
