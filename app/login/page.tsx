import Link from "next/link";
import LoginForm from "@/app/ui/login-form";
import { Metadata } from "next";
import MYEnterpriseLogo from "../ui/myenterprise-logo";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-sky-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <MYEnterpriseLogo />
          </div>
        </div>
        <LoginForm />
        <Link href="/">
          <button>Cancel</button>
        </Link>
      </div>
    </main>
  );
}
