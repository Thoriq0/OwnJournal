import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, context) {
   const { id } = await context.params;

   const note = await prisma.note.findUnique({
      where: { id: parseInt(id) },
   });

   if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
   }

   return Response.json(note);
}



export async function PUT(req, context) {
   try {
      const { id } = await context.params;
      const data = await req.json();

      console.log("Data diterima PUT:", data);

      const updated = await prisma.note.update({
         where: { id: parseInt(id) },
         data: {
            title: data.title,
            content: data.content,
            mood: data.mood,
            date: data.date ? new Date(data.date) : undefined,
         },
      });

      return Response.json(updated);
   } catch (err) {
      console.error("❌ PUT /api/notes/[id] error:", err);
      return Response.json({ error: err.message }, { status: 500 });
   }
}

export async function DELETE(req, context) {
   try {
      const { id } = await context.params;
      await prisma.note.delete({
         where: { id: parseInt(id) },
      });

      return Response.json({ message: "Catatan dihapus" });
   } catch (err) {
      console.error("❌ DELETE /api/notes/[id] error:", err);
      return Response.json({ error: err.message }, { status: 500 });
   }
}
