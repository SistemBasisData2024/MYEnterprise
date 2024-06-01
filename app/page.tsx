import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import { Metadata } from "next";
import MYEnterpriseLogo from "@/app/ui/myenterprise-logo";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-sky-500 p-4 md:h-52">
        <MYEnterpriseLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-1/2 md:px-20">
          <p
            className={`${lusitana.className} antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            MYEnterprise is a powerful Enterprise Resource Planning (ERP) app
            that allows you to manage your business processes in a centralized
            system.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-sky-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-sky-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-1/2 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
        </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-20">
          <p
            className={`${lusitana.className} antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}
          >
            With MYEnterprise, you can easily integrate various functions of
            your business, from supply chain management and inventory control to
            accounting, HR, and more. Our ERP system provides a unified solution
            to streamline your business processes, increase efficiency, and make
            data-driven decisions. Contact us today for additional details and
            to see how MYEnterprise can revolutionize your business management
            workflow.
          </p>
        </div>
      </div>
    </main>
  );
}
