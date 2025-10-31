"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Calendar, Smile, Frown, Meh, X } from "lucide-react";

export default function NoteCard({ id, date, mood, title, content }) {
   const router = useRouter();

   const moodIcons = {
      senang: <Smile className="inline w-4 h-4 text-[#5A9BC0]" />,
      biasa: <Meh className="inline w-4 h-4 text-[#E7B750]" />,
      buruk: <Frown className="inline w-4 h-4 text-[#B16D6D]" />,
   };

   const yourMood = moodIcons[mood] || null;

   return (
      <motion.div
         onClick={() => router.push(`/notes/${id}`)}
         initial={{ y: 30, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.6 }}
         whileHover={{
            scale: 1.03,
            boxShadow: "0 0 25px rgba(90,155,192,0.5)",
            cursor: "pointer",
         }}
         className="bg-[#3E6072] rounded-2xl p-4 border border-[#3B5A6A] shadow-[0_0_15px_rgba(0,0,0,0.2)] transition"
      >
         <p className="text-sm text-[#A3B5BF] mb-2 flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#A3B5BF]" />
            {date} • {yourMood}
         </p>
         <h2 className="text-lg sm:text-xl font-semibold text-[#D7D7D7]">
            {title}
         </h2>
         <p className="mt-2 text-[#D7D7D7]/90 line-clamp-3">{content}</p>
      </motion.div>
   );
}
