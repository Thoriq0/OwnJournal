"use client";
import { motion } from "framer-motion";
import { Search, FileText } from "lucide-react";

export default function Header({ onSearch }) {
   return (
      <motion.header
         initial={{ y: -20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         transition={{ duration: 0.6 }}
         className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 bg-[#3E6072]/60 backdrop-blur-sm p-4 rounded-xl shadow-md border border-[#3B5A6A]"
      >
         <h1
            className="text-2xl sm:text-3xl font-semibold tracking-wide flex items-center gap-3"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
         >
            <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-[#E7B750]" />
            Jurnal Harian
         </h1>

         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3B5BF] w-4 h-4" />
               <input
                  type="text"
                  placeholder="Cari catatan..."
                  onChange={(e) => onSearch(e.target.value)}
                  className="pl-9 pr-4 py-2 w-full rounded-xl border border-[#3B5A6A] bg-[#3E6072]/80 focus:outline-none focus:ring-2 focus:ring-[#5A9BC0] text-[#D7D7D7] placeholder:text-[#A3B5BF]"
               />
            </div>

            <motion.div
               whileHover={{ scale: 1.03 }}
               transition={{ type: "spring", stiffness: 200 }}
               className="flex items-center justify-between sm:justify-center gap-2 bg-[#3E6072]/70 px-3 py-2 rounded-xl border border-[#3B5A6A] w-full sm:w-auto"
            >
               <span className="text-sm whitespace-nowrap">
                  Halo, <b>Thor</b>
               </span>
               <img
                  src="/thor.jpg"
                  alt="User"
                  className="w-8 h-8 rounded-full border border-[#5A9BC0]"
               />
            </motion.div>
         </div>
      </motion.header>
   );
}
