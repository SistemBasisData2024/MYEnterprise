"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { auth } from "@/auth";
import redis from "./redis";
import { CustomerField } from "@/app/lib/definitions";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than 0$." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    //Validate form using Zod
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    //If form validation fails, return errors early. Otherwise, continue.
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice",
    };
  }

  const { customerId, amount, status } = validatedFields.data; //Prepare data for insetion into database.
  const date = new Date().toISOString().split("T")[0];
  const session = await auth();
  const employee = session?.user?.id;
  const { rows } = await sql`
    SELECT company_id
    FROM employee
    WHERE id = ${employee}
  `;

  const companyId = rows[0]?.company_id;

  try {
    //Insert data into the database.
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date, employee_id, company_id)
        VALUES (${customerId}, ${amount}, ${status}, ${date}, ${employee}, ${companyId});
    `;
  } catch (error) {
    //If database error occurs, return a more specific error.
    console.log(error);
    return { message: "Database Error : Failed to Create Invoice" };
  }

  revalidatePath("/dashboard/invoices"); //Revalidate the cache for the invoice pafe and redirect the user.
  redirect("/dashboard/invoices");
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customer_id"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amount}, status = ${status}
        WHERE id = ${id}
        `;
    await redis.del(`invoice:${id}`);
  } catch (error) {
    console.log(error);
    return { message: "Database Error : Failed to Update Invoice" };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    console.log(error);
    return { message: "Database Error : Failed to Delete Invoice" };
  }

  revalidatePath("dashboard/invoices");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function fetchCustomers(): Promise<CustomerField[]> {
  const session = await auth();
  const employee = session?.user?.email;
  console.log(employee);
  console.log(session);
  const { rows } = await sql`
    SELECT company_id
    FROM employee
    WHERE email = ${employee}
  `;

  const companyId = rows[0]?.company_id;
  console.log(companyId);
  try {
    const { rows } = await sql`
      SELECT id, name, email, phone_number
      FROM customers
      WHERE company_id = ${companyId}
    `;

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone_number: row.phone_number,
    }));
    console.log(rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw new Error('Failed to fetch customers');
  }
}

export async function deletecustomers(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
  } catch (error) {
    console.log(error);
    return { message: "Database Error : Failed to Delete Invoice" };
  }

  revalidatePath("dashboard/customers");
}