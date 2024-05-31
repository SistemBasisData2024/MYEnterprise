import { lusitana } from "@/app/ui/fonts";

export default function MYEnterpriseLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/*Import logo here then use className = "h-12 w-12 rotate-[15deg]"*/}
      <p className="text-[44px]">MYEnterprise</p>
    </div>
  );
}
