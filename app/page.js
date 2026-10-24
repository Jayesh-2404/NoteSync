"use client"
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import LandingPage from "@/components/landing/landing";

export default function Home() {

    const {user} = useUser(); 
    const  createUser = useMutation(api.user.createUser); 

    useEffect(()=>{
      user&&CheckUser();
    },[user]);


    const CheckUser = async() => {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      await createUser({
        email,
        userName: user?.fullName || user?.firstName || "User",
        imageUrl: user?.imageUrl || ""
      });
    }


  return (
    <div >
      <LandingPage/>
    </div>
  );
}
