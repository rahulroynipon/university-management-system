import { LuDisc } from "react-icons/lu";

const goalList = [
  "Enroll better quality students and provide remedial courses for those with weaknesses in skills such as English and Mathematics.",
  "Financial aid and loans will be available for deserving students.",
  "Recruit highly trained teachers with at least one foreign degree.",
  "Use cases and other experiential learning methods.",
  "Maintain a state-of-the-art computer laboratory with Internet access and modern classroom equipment.",
  "Maintain a library with the latest books, journals, and CD-ROMs.",
  "Invite guest speakers of outstanding capability from the world of business and academia.",
  "Engage students in extracurricular activities such as sports, debates, study tours, and social services.",
  "Establish linkages with universities abroad (Australia, USA, and UK) to enhance capabilities in teaching, research, and student exchange.",
  "Build an international standard campus.",
];

export default function VisionMission() {
  return (
    <div className="flex flex-col space-y-7 tracking-wide leading-[27px] text-gray-600">
      <section className="space-y-4">
        <h1 className="font-bold text-xl text-black">
          Mission, Vision, Goals and Objectives
        </h1>
        <p>
          “Human history becoming more and more a race between education and
          catastrophe.” The vision of City University is to create a culture of
          excellence and to accelerate national development by establishing an
          institution of higher learning that is responsive to society’s needs
          for the 21st century and beyond.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-xl text-black">Mission</h2>
        <p>
          City University is committed to the idea of equal opportunity,
          transparency, and non-discrimination. Its primary mission is to
          provide high-quality instruction and research at a reasonable cost. It
          also renders community service through dissemination of information,
          organization of training programs, and other outreach activities.
          Sensitive to the needs of its students and staff, City University is
          dedicated to creating a human, responsive, and invigorating atmosphere
          for productive learning and innovative thinking.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-xl text-black">Goal</h2>
        <p>
          To emerge as one of the topmost universities in Bangladesh in the next
          few years, and to provide essential intellectual and physical
          facilities of the highest standards.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-bold text-xl text-black">Objectives</h2>
        <ul className="ml-3 md:ml-5 space-y-3">
          {goalList.map((goal, index) => (
            <li key={index} className="flex items-start gap-3">
              <LuDisc className="mt-1 text-gay-600 shrink-0" />
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
