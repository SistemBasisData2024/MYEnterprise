import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/ui/global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | MYEnterprise",
    default: "MYEnterprise Dashboard",
  },
  description:
    "MYEnterprise is an Enterprise Resource Management (ERM) application that helps businesses manage various aspects of their operations. It provides features such as inventory management, sales and purchase tracking, financial management, and human resource management. With MYEnterprise, businesses can streamline their processes, improve efficiency, and make data-driven decisions. Experience the power of MYEnterprise and take your business to new heights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
