"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Edit3, Trash2, Calendar, Smile } from "lucide-react";
import Link from "next/link";

export default function NoteDetailPage() {
   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
         className="min-h-screen bg-[#273F4F] text-[#D7D7D7] p-6 sm:p-10"
      >
         {/* Back Button */}
         <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#A3B5BF] hover:text-[#E7B750] transition mb-8"
         >
            <ArrowLeft className="w-4 h-4" /> Kembali ke daftar
         </Link>

         {/* Note Card */}
         <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-[#3E6072]/80 border border-[#3B5A6A] rounded-2xl shadow-lg p-6 sm:p-10 backdrop-blur-sm"
         >
            {/* Header Note Info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
               <div>
                  <p className="flex items-center gap-2 text-[#A3B5BF] text-sm sm:text-base">
                     <Calendar className="w-4 h-4" />
                     27 Oktober 2025 •
                     <Smile className="w-4 h-4 text-[#5A9BC0]" />
                     Mood Senang
                  </p>
                  <h1
                     className="text-2xl sm:text-3xl font-semibold mt-2 text-[#E7E7E7]"
                     style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                     Hari yang Menyenangkan ☕
                  </h1>
               </div>

               <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <motion.button
                     whileHover={{ scale: 1.1 }}
                     className="p-2 rounded-xl bg-[#E7B750] text-black hover:bg-[#f2c866] transition"
                  >
                     <Edit3 className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                     whileHover={{ scale: 1.1 }}
                     className="p-2 rounded-xl bg-[#B16D6D] text-white hover:bg-[#c77f7f] transition"
                  >
                     <Trash2 className="w-5 h-5" />
                  </motion.button>
               </div>
            </div>

            {/* Note Content */}
            <div className="text-[#D7D7D7]/90 leading-relaxed space-y-4">
               <p>
                  Hari ini aku bangun pagi dan langsung ngerasa semangat banget. Udara
                  di luar seger, jadi aku mutusin buat jalan-jalan sebentar ke taman.
                  Setelah itu ketemu temen lama di coffee shop dan ngobrol panjang
                  banget tentang kerjaan dan rencana masa depan.
               </p>
               <p>
                  Kadang hal sederhana kayak kopi dan obrolan santai bisa bikin hari
                  terasa ringan banget. Mungkin emang bahagia itu sederhana — asal
                  hati kita tenang.
               </p>
               <p className="italic text-[#A3B5BF]">
                  "Kopi, obrolan, dan sedikit waktu buat diri sendiri — cukup buat
                  bikin hari terasa berarti."
               </p>
            </div>
         </motion.div>
      </motion.div>
   );
}
