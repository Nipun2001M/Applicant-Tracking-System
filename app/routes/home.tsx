import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "../../constants/index";
import ResumeCard from "~/components/ResumeCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedback for your dream job!" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Track Your Applications and Reasume Ratings</h1>
          <h2>Review Your Submissions and Check AI Powered Feedback</h2>
        </div>
      </section>

      {resumes.length > 0 && (
        <div>
          {resumes.map((resume) => (
            <div>
              <ResumeCard key={resume.id} resume={resume} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
