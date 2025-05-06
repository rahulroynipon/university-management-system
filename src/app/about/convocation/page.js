import Image from "next/image";
import convocationImage1 from "@/assets/convocation-1.jpg";
import convocationImage2 from "@/assets/convocation-2.jpg";

export default function Convocation() {
  return (
    <div className="space-y-7 md:space-y-12">
      <Image src={convocationImage1} alt="4th Convocation" />
      <Image src={convocationImage2} alt="5th Convocation" />
    </div>
  );
}
