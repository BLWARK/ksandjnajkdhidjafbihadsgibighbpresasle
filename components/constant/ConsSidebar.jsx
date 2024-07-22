import { GoHomeFill } from "react-icons/go";
import { MdCalculate, MdLeaderboard } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { RiExchangeDollarLine } from "react-icons/ri";


export const sideButton = [
    {
        icon: <GoHomeFill className="w-[20px] h-auto" />,
        title: "Dashboard",
        link: "/main"
    },
    {
        icon: <FaFire className="w-[20px] h-auto" />,
        title: "Buy Now",
        link: "/main/buynow"
    },
    {
        icon: <MdCalculate className="w-[20px] h-auto" />,
        title: "Calculator",
        link: "/main/calculator"
    },
    {
        icon: <RiExchangeDollarLine className="w-[25px] h-auto" />,
        title: "Transaction",
        link: "/main/transaction",
        
    },
    {
        icon: <MdLeaderboard className="w-[25px] h-auto" />,
        title: "Leaderboards",
        link: "/main/leaderboards",
        
    },
];
