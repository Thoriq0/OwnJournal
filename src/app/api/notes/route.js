import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET() {
   const notes = await prisma.note.findMany({
      orderBy: { createdAt: "desc" },
   });
   return Response.json(notes);
}


export async function POST(req) {
   try {
      const { title, content, mood, date } = await req.json();

      const note = await prisma.note.create({
         data: { title, content, mood, date: new Date(date) },
      });

      return Response.json(note, { status: 201 });
   } catch (error) {
      console.error(error);
      return Response.json({ error: "Gagal membuat catatan" }, { status: 500 });
   }
}
