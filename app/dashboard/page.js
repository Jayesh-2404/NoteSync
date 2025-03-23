"use client"

import React from 'react'
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function Dashboard() {
  const { user } = useUser();
  
  // Ensure the user email is available
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  console.log("User Email:", userEmail); // Log the user email

  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: userEmail // Ensure the correct key is used
  });

  console.log("File List:", fileList); // Log the file list

  return (
    <div>
      <h2 className='font-medium text-3xl mb-4'>Workspace</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {fileList === undefined ? (
          <div>
            <Skeleton count={3} height={50} />
          </div>
        ) : fileList.length > 0 ? (
          fileList.map((file, index) => (
            <Link key={index} href={`/workspace/${file.fileId}`} className="flex flex-col items-center border p-4 rounded-lg shadow hover:shadow-lg transition-shadow">
              <Image src={'/pdf-file.png'} alt='file' width={70} height={70} />
              <h2 className="mt-2 text-center">{file.fileName}</h2>
            </Link>
          ))
        ) : (
          <p>No files found.</p>
        )}
      </div>
    </div>
  )
}

export default Dashboard;