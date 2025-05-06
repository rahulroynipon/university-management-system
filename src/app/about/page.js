import aboutImage from "@/assets/about.png";
import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col space-y-7 tracking-wide leading-[27px] text-gray-600">
      <div>
        <Image src={aboutImage} alt="About City University" priority />
      </div>

      <section className="space-y-4">
        <h1 className="font-bold text-xl text-black">About Our University</h1>
        <p>
          City University began its journey in mid-autumn of 2002 with just
          fifteen students, two departments, limited resources, and a passionate
          team of teachers. Over the past 16 years, it has grown into a
          prestigious institution with over 8,000 students, six computer
          laboratories, mechanical workshops, digital, physics, chemistry, and
          textile laboratories, and ten flourishing departments (with two more
          underway). Supported by well-trained faculty, committed staff, and
          dedicated management, City University has transformed from a humble
          experiment into a respected center of higher education, attracting
          students both locally and globally.
        </p>
      </section>

      <section className="space-y-5">
        <h1 className="font-bold text-xl text-black">
          A Journey of Growth and Excellence
        </h1>
        <p>
          City University serves its students and faculty with state-of-the-art
          facilities: fully equipped laboratories, a comprehensive library,
          IT-transcription centers for part-time on-campus employment
          (especially in financial transcription), a modern café, a spacious
          auditorium with advanced lighting and sound systems, student hostels,
          and indoor sports amenities, including a billiards area. Scholarships
          from the Alhaj Mockbul Hossain Foundation are available for
          meritorious students.
        </p>

        <p>
          What truly distinguishes City University is not just its
          infrastructure, but its commitment to a rich cultural and
          research-oriented environment. The university promotes a &quot;Culture
          of Excellence&quot; through vibrant celebrations of national and
          international festivals. Students actively participate in debates,
          programming contests, and research workshops. The university hosts
          five dynamic clubs: Career Development Club, Debating Club, Cultural
          Club, Sports Club, and Magazine Club. One of our proud achievements is
          this very website—developed by a talented student, Md. Toufecul Islam.
        </p>

        <p>
          Behind these accomplishments is a dedicated leadership team: the City
          University Board of Governors, Treasurer Md. Majibar Rahman Miah,
          Acting Vice Chancellor Professor Mustafizur Rahman, and others, all
          working with a shared vision of enlightenment and progress.
        </p>

        <p>
          Our new permanent campus has commenced operations in Khagan, Savar,
          alongside the City Campus in Dhaka.
        </p>

        <p>
          The university prioritizes student welfare through various
          initiatives:
        </p>

        <ul className="list-disc ml-10 text-gray-700 space-y-1">
          <li>Educational loan facilities with 10-year repayment terms.</li>
          <li>Scholarships for deserving students.</li>
          <li>
            On-campus, technology-driven part-time job opportunities for
            students.
          </li>
        </ul>

        <p>
          We believe that financial hardship should never hinder talent. With
          pride and determination, City University continues to march
          forward—for a better Bangladesh, a better tomorrow, and a pursuit of
          excellence.
        </p>
      </section>
    </div>
  );
}
