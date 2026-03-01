import { Link } from "@/i18n/navigation";
import Image from "next/image";

const Logo: React.FC<{
  isScrolled: boolean;
  isScrollable: boolean;
}> = ({ isScrolled, isScrollable }) => {
  return (
    <div className="flex flex-1 items-center ">
      <Link href="/">
        <Image
          src="/images/Logo_Site-Horizontal_UPG.png"
          alt="EkAdventure Logo"
          width={500}
          height={500}
          className={`transition-all duration-300 h-auto ${isScrolled || !isScrollable ? "w-[110px] lg:w-[110px]" : "w-[150px] lg:w-[140px]"}`}
        />
      </Link>
    </div>
  );
};

export default Logo;
