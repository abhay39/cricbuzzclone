import Image from "next/image"
import Link from "next/link"

const Header = () => {
  return (
    <nav className=" bg-[#00B489] px-6 py-3 flex items-center justify-between" >
        <Image src="/l.png" width={50} height={30} />
        <ul className=" flex text-white gap-4 cursor-pointer">
            <Link href={"/"}>Live Score</Link>
            <Link href={"/"}>Schedule</Link>
            <Link href={"/"}>Teams</Link>
        </ul>
    </nav>
  )
}

export default Header