"use client";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function FilterBar({ onMoodChange, onDateChange }) {
   const moods = [
      { label: "Semua", value: "" },
      { label: "Mood Senang", value: "senang" },
      { label: "Mood Biasa", value: "biasa" },
      { label: "Mood Buruk", value: "buruk" },
   ];

   return (
      <motion.div
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ delay: 0.2, duration: 0.6 }}
         className="flex flex-col lg:flex-row flex-wrap items-start lg:items-center justify-between gap-3 mb-6"
      >
         {/* Filter Mood */}
         <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {moods.map((item) => (
               <motion.button
                  key={item.label}
                  whileHover={{ scale: 1.05, backgroundColor: "#5A9BC0" }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={() => onMoodChange(item.value)}
                  className="px-4 py-2 bg-[#3E6072] rounded-xl transition text-[#D7D7D7] text-sm sm:text-base"
               >
                  {item.label}
               </motion.button>
            ))}
            {/* Filter Tanggal */}
            <motion.div
               whileHover={{ scale: 1.02 }}
               className="flex items-center gap-2 bg-[#3E6072]/70 px-3 py-2 rounded-xl border border-[#3B5A6A] w-full sm:w-auto"
            >
               <input
                  type="date"
                  onChange={(e) => onDateChange(e.target.value)}
                  className="bg-transparent text-[#D7D7D7] focus:outline-none text-sm w-full sm:w-auto"
               />
            </motion.div>
         </div>
         
         {/* Tombol Buat Catatan */}
         <Link
            href="/notes/create"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 bg-[#E7B750] rounded-2xl shadow-md text-black font-semibold transition hover:bg-[#F2C866]"
         >
            <PlusCircle className="w-5 h-5" />
            Catatan Baru
         </Link>
      </motion.div>
   );
}
