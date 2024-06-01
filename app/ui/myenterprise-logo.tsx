import { lusitana } from "@/app/ui/fonts";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

export default function MYEnterpriseLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BuildingOffice2Icon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">MYEnterprise</p>
    </div>
  );
}
