"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Home() {

    const {user} = useUser(); 
    const  createUser = useMutation(api.user.createUser); 

    useEffect(()=>{
      user&&CheckUser();
    },[user]);


    const CheckUser = async() => {
      // if (!user) return;
      
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        imageUrl: user?.imageUrl
      });
      console.log(result);
    }


  return (
    <div >
      <Button>
        hello
      </Button>
      <UserButton />
    </div>
  );
}
