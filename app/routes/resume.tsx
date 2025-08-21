import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumind | Review" },
  { name: "description", content: "Detailed overview of your resume" },
];

const resume = () => {
    const {auth,isLoading,fs,kv}=usePuterStore()
    const { id } = useParams();
    const [imageUrl,setImageURL]=useState('')
    const [resumeUrl,setResumeURL]=useState('')
    const [feedbackUrl,setFeedback]=useState('')
    const navigate=useNavigate()


  useEffect(()=>{
    const loadResume=async()=>{
        const resume=await kv.get(`resume:${id}`)
        if(!resume) return

        const data=JSON.parse(resume)
        //putr cloud returns blobs
        const resumeBlob=await fs.read(data.resumePath)
        if (!resumeBlob) return

        const pdfBlob=new Blob([resumeBlob],{type:"application/pdf"})
        const resumeUrl=URL.createObjectURL(pdfBlob)
        setResumeURL(resumeUrl)

        const imageBlob=await fs.read(data.imagePath)
        if(!imageBlob) return
        const imageUrl=URL.createObjectURL(imageBlob)
        setImageURL(imageUrl)

        setFeedback(data.feedback)


        



    }

    loadResume()


  },[id])

  return (
    <main className="!pt-0">
      <nav className="resume-nav">
        <Link to="/" className="back-button">
          <img src="/icons/back.svg" alt="logo" className="w-2.5 h-2.5" />
          <span className="text-gray-800 text-sm font-semibold">
            Back to Homepage
          </span>
        </Link>
      </nav>
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section">
            {imageUrl && resumeUrl && (

                


            ) }

        </section>
      </div>
    </main>
  );
};

export default resume;
