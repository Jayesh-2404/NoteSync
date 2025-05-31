import { SignIn } from '@clerk/nextjs'
import {afterSignInUrl , redirectUrl} from '@clerk/nextjs'
export default function Page() {
   return <SignIn afterSignInUrl="/dashboard" redirectUrl="/dashboard" />;
}
