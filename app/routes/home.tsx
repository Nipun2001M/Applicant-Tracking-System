import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
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
    const {  auth ,fs,kv} = usePuterStore();
    const navigate = useNavigate();
    const [resumes,setResumes]=useState<Resume[]>([])
    const [loadingResumes, setloadingResumes] = useState(false)

    useEffect(() => {
      console.log("is authenticated", auth.isAuthenticated);
      if(!auth.isAuthenticated) navigate('/auth?next=/')
      
     
    }, [auth.isAuthenticated]);


    useEffect(()=>{
      console.log('inside useeffect')
      const loadResumes=async()=>{
        setloadingResumes(false)
        const resumes=(await kv.list('resume:*',true))as KVItem[]

        const parsedResumes=resumes.map((resume)=>(
          JSON.parse(resume.value) as Resume
        ))

        setResumes(parsedResumes || [])
        setloadingResumes(false)
        console.log('Parsed Resume : ',parsedResumes)



      }

      loadResumes()

    },[])


  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Applications and Reasume Ratings</h1>
          <h2>Review Your Submissions and Check AI Powered Feedback</h2>
        </div>
        {!loadingResumes && resumes.length > 0 && (
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
 