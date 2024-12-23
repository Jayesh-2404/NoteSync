import {mutation} from "./_generated/server";
import { v } from "convex/values";



export const  createUser= mutation({
    args:{                       
        email:v.string(),
        userName : v.string(), 
        imageUrl : v.string()
    }, 
    async handler(ctx, args) {
        // console.log("Creating user with args:", args); // Debug log

        // // Validate that all required fields are present
        // if (!args.email || !args.userName || !args.imageUrl) {
        //     th row new Error("All fields (email, userName, imageUrl) are required");
        // }

        const user = await ctx.db.query('users')
        .filter((q)=>q.eq(q.field('email'),args.email))
        .collect();

        console.log("Existing users found:", user); // Debug log

        //if not , then insert the new user entry

        if(user?.length ==0){
            await ctx.db.insert('users',{
                email:args.email,
                userName:args.userName,
                imageUrl:args.imageUrl
            });
            return 'Inserted New User .. '
        }
        return 'User Already Exist'

        
    }
})