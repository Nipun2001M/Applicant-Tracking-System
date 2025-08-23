import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedback for your dream job!" },
  ];
}

export default function Home() {
    const {  auth ,fs} = usePuterStore();
    const navigate = useNavigate();
    const [resume, setResume] = useState('')

    useEffect(() => {
      if(!auth.isAuthenticated) navigate('/auth?next=/')
     
    }, [auth.isAuthenticated]);

    useEffect(()=>{

      const loadResume=async()=>{
        const blob=await fs.read(resume.imagePath)
        if (!blob) return

        let url=URL.createObjectURL(blob)
        setResume(url)




      }
      loadResume(resume.imagePath)

    },[]) 
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications and Reasume Ratings</h1>
          <h2>Review Your Submissions and Check AI Powered Feedback</h2>
        </div>
        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <div>
                <ResumeCard key={resume.id} resume={resume} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
 