import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Image
      src="/logo.png"
      alt="Logo 2PEOPLES"
      width={100}
      height={100}
      />
      <nav>
        <ul>
          <li><Link
              href="/"

          >Home</Link></li>
          <li><a href="/">Events</a></li>
          <li><Link
              href="../login"

          >Log In</Link></li>
        </ul>
      </nav>
    </header>
  )
}