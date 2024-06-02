import { lusitana } from "@/app/ui/fonts";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";

export default function MYEnterpriseLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BuildingOffice2Icon className="h-6 w-6 md:h-12 md:w-12" />
      <p className="text-[20px] md:text-[25px]">MYEnterprise</p>
    </div>
  );
}
