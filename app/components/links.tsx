import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks(link, word) {
  const pathname = usePathname()
  return (
    <Link
    href={link}
    className={`
    ${pathname} === link.href ? 'color:#0066CC' : ''
    `}
    >{word}
    </Link>
  )
}