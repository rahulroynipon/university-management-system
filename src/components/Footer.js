import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import shortLogo from "@/assets/short-logo.png";
import quickLinks from "@/data/navitem.json";
import Image from "next/image";
import Link from "next/link";

const socialIcons = [
  {
    icon: <FaFacebookF />,
    link: "https://www.facebook.com/cityuniversity.ac.bd/",
    name: "Facebook",
  },
  {
    icon: <FaLinkedinIn />,
    link: "https://www.linkedin.com/company/cubangladesh/",
    name: "LinkedIn",
  },
  {
    icon: <BsInstagram />,
    link: "https://www.instagram.com/cityuniversity.ac.bd/",
    name: "Instagram",
  },
];

const devloperInfo = [
  { name: "Rahul Roy Nipon", link: "https://www.facebook.com/RahulR0YNipon" },
  { name: "Mahir Foysal", link: "https://www.facebook.com/mahir7foysal" },
  {
    name: "Mohammad Sohag Mia",
    link: "https://www.facebook.com/Sohug1234",
  },
  {
    name: "Md Abu Talha",
    link: "https://www.facebook.com/profile.php?id=61552516341631",
  },
];

export default function Footer() {
  return (
    <footer className="text-white">
      <section className="padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-10 bg-black">
        <div>
          <Link href="/">
            <Image
              src={shortLogo}
              alt="City University short logo"
              className="ring-2 ring-[#202020] p-2 w-16 rounded-full"
            />
          </Link>
          <p className="font-bold text-lg my-3">Permanent Campus</p>
          <span className="h-[1.5px] mb-4 bg-red-700 inline-block w-full" />
          <address className="not-italic leading-7 text-[#EAEAEA]">
            <div>Khagan, Birulia, Savar, Dhaka-1340, Bangladesh</div>
            <div>
              Telephone: <Link href="tel:09643-234234">09643-234234</Link>
            </div>
            <div>
              Cell: <Link href="tel:+8801322917670">+8801322917670</Link>
              <br />
              <Link href="tel:+8801322917671">+8801322917671</Link>
            </div>
            <div className="mt-5">
              <Link href="mailto:admin@cityuniversity.ac.bd">
                admin@cityuniversity.ac.bd
              </Link>
            </div>
          </address>
        </div>

        <div>
          <p className="font-bold text-lg my-3">For Query</p>
          <span className="h-[1.5px] mb-4 bg-red-700 inline-block w-full" />
          <div className="leading-7">
            Cell: <Link href="tel:+8801322917672">+8801322917672</Link>
            <br />
            <Link href="tel:+8801322917673">+8801322917673</Link>
          </div>
        </div>

        <div>
          <p className="font-bold text-lg my-3">Quick Links</p>
          <span className="h-[1.5px] mb-4 bg-red-700 inline-block w-full" />
          <ul className="space-y-3">
            {quickLinks.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className=" transition-colors duration-200 text-[#EAEAEA]/65 hover:text-[#EAEAEA]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-bold text-lg my-3">Developed By</p>
          <span className="h-[1.5px] mb-4 bg-red-700 inline-block w-full" />
          <ul className="space-y-3">
            {devloperInfo.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" transition-colors duration-200 text-[#EAEAEA]/65 hover:text-[#EAEAEA]"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="padding flex justify-between flex-col md:flex-row gap-4 bg-[#202020] text-sm text-[#CCCCCC]">
        <p>© 2025 City University. All rights reserved.</p>
        <ol className="flex flex-wrap gap-5 text-xl">
          {socialIcons.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${item.name} page`}
                className="text-white"
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ol>
      </section>
    </footer>
  );
}
