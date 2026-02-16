"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
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

      const result = await createUser({
        email,
        userName: user?.fullName || user?.firstName || "User",
        imageUrl: user?.imageUrl || ""
      });
      console.log(result);
    }


  return (
    <div >
      {/* <Button>
        hello
      </Button> */}
      <UserButton />
      <LandingPage/>
    </div>
  );
}
