import { action, mutation } from "./_generated/server.js";
import { v } from "convex/values";

export const AddNotes = mutation({
  args: {
    fileId: v.string(),
    notes:v.any(),
    createdBy: v.string()
  },
  handler: async (ctx, args) => {
    const recordId = await ctx.db.query("notes")
    .filter(q => q.eq(q.field("fileId"), args.fileId)).collect();

    if(recordId?.length==0){
      await ctx.db.insert('notes',{
        fileId:args.fileId,
        notes:args.notes,
        createdBy:args.createdBy
      })
    }else{
      await ctx.db.patch(record[0]._id , {notes:args.notes})
    }
  },
});

