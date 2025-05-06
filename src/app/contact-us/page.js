import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import contactImage from "@/assets/contact.jpeg";
import Image from "next/image";

export const metadata = {
  title: "Contact Us | City University",
  description:
    "Get in touch with City University. Find contact information, support services, and more.",
  keywords: [
    "City University",
    "Contact",
    "Support",
    "Help Desk",
    "University Contact",
  ],
};

export default function ContactUs() {
  return (
    <div className="bg-[#161616]">
      <div className="relative w-full h-60 md:h-80">
        <Image
          src={contactImage}
          alt="City University Contact Us Banner"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            Contact Us
          </h1>
        </div>
      </div>

      <section className="width padding leading-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-28 py-14 md:py-16">
          {/* Phone Section */}
          <div className="space-y-3">
            <FaPhone className="text-3xl text-primary" />
            <h2 className="text-2xl font-extrabold my-4">Phone</h2>
            <ul className="space-y-1">
              <li>
                Telephone: <Link href="tel:09643234234">09643-234234</Link>
              </li>
              <li>
                Cell: <Link href="tel:+8801322917670">+8801322917670</Link>,{" "}
                <Link href="tel:+8801322917671">+8801322917671</Link>
              </li>
              <li>
                Cell: <Link href="tel:+8801322917672">+8801322917672</Link>,{" "}
                <Link href="tel:+8801322917673">+8801322917673</Link>
              </li>
            </ul>
          </div>

          {/* Email Section */}
          <div className="space-y-3">
            <MdOutlineMail className="text-3xl text-primary" />
            <h2 className="text-2xl font-extrabold my-4">Email</h2>
            <ul className="space-y-1">
              <li>
                <Link href="mailto:registrar@cityuniversity.ac.bd">
                  registrar@cityuniversity.ac.bd
                </Link>
              </li>
              <li>
                <Link href="mailto:admin@cityuniversity.ac.bd">
                  admin@cityuniversity.ac.bd
                </Link>
              </li>
            </ul>
          </div>

          {/* Location Section */}
          <div className="space-y-3">
            <FaLocationArrow className="text-3xl text-primary" />
            <h2 className="text-2xl font-extrabold my-4">Location</h2>
            <p>Khagan, Birulia, Savar, Dhaka-1340, Bangladesh</p>
          </div>
        </div>
      </section>

      {/* map */}
      <section className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13206.685689187136!2d90.309742!3d23.8731!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c2102dc1cd51%3A0x6f95e92193fc8978!2sCity%20University%20Bangladesh!5e1!3m2!1sen!2sbd!4v1746524893262!5m2!1sen!2sbd"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </div>
  );
}
