"use client";
import { motion } from "framer-motion";
import { ArrowLeft, PlusCircle, Calendar, Smile, Frown, Meh } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Notify from "@/app/components/notify";

export default function CreateNotePage() {
   const [title, setTitle] = useState("");
   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
   const [mood, setMood] = useState("");
   const [content, setContent] = useState("");

   const [notif, setNotif] = useState({
      show: false,
      message: "",
      type: "info",
   });

   const showNotif = (message, type = "info") => {
      setNotif({ show: true, message, type });
      setTimeout(() => setNotif({ show: false, message: "", type: "info" }), 3000);
   };


   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const res = await fetch("/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, date, mood, content }),
         });

         if (!res.ok) throw new Error("Gagal menyimpan");

         const newNote = await res.json();
         console.log("Note berhasil dibuat:", newNote);

         showNotif("Catatan baru berhasil dibuat!", "success");

         setTimeout(() => {
            window.location.href = "/";
         }, 1200);
      } catch (err) {
         console.error(err);
         showNotif("Gagal menyimpan catatan.", "error");
      }
   };



   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.6 }}
         className="min-h-screen bg-[#273F4F] text-[#D7D7D7] p-6 sm:p-10"
      >
         {/* Back Button */}
         <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#A3B5BF] hover:text-[#E7B750] transition mb-8"
         >
            <ArrowLeft className="w-4 h-4" /> Kembali ke daftar
         </Link>

         {/* Form Container */}
         <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-[#3E6072]/80 border border-[#3B5A6A] rounded-2xl shadow-lg p-6 sm:p-10 backdrop-blur-sm"
         >
            <h1
               className="text-2xl sm:text-3xl font-semibold mb-6 text-[#E7E7E7]"
               style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
               Buat Catatan Baru
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Judul */}
               <div>
                  <label className="block text-sm text-[#A3B5BF] mb-2">Judul</label>
                  <input
                     type="text"
                     placeholder="Judul catatan..."
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="w-full p-3 rounded-xl bg-[#3E6072]/80 border border-[#3B5A6A] text-[#D7D7D7] focus:outline-none focus:ring-2 focus:ring-[#5A9BC0]"
                  />
               </div>

               {/* Tanggal & Mood */}
               <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                     <label className="block text-sm text-[#A3B5BF] mb-2 flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> Tanggal
                     </label>
                     <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 rounded-xl bg-[#3E6072]/80 border border-[#3B5A6A] text-[#D7D7D7] focus:outline-none focus:ring-2 focus:ring-[#5A9BC0]"
                     />
                  </div>

                  <div className="flex-1">
                     <label className="block text-sm text-[#A3B5BF] mb-2">Mood</label>
                     <div className="flex gap-2">
                        {[
                           { label: "Senang", value: "senang", icon: <Smile /> },
                           { label: "Biasa", value: "biasa", icon: <Meh /> },
                           { label: "Buruk", value: "buruk", icon: <Frown /> },
                        ].map((item) => (
                           <motion.button
                              type="button"
                              key={item.value}
                              whileHover={{ scale: 1.05 }}
                              onClick={() => setMood(item.value)}
                              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl border transition ${mood === item.value
                                 ? "bg-[#5A9BC0] border-[#5A9BC0] text-white"
                                 : "bg-[#3E6072] border-[#3B5A6A] text-[#D7D7D7]"
                                 }`}
                           >
                              {item.icon} {item.label}
                           </motion.button>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Isi Catatan */}
               <div>
                  <label className="block text-sm text-[#A3B5BF] mb-2">Isi Catatan</label>
                  <textarea
                     rows={8}
                     placeholder="Tulis isi catatanmu di sini..."
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                     className="w-full p-3 rounded-xl bg-[#3E6072]/80 border border-[#3B5A6A] text-[#D7D7D7] focus:outline-none focus:ring-2 focus:ring-[#5A9BC0]"
                  />
               </div>

               {/* Tombol Aksi */}
               <div className="flex justify-end gap-4 pt-4">
                  <Link
                     href="/"
                     className="px-5 py-2 rounded-xl bg-[#3E6072] hover:bg-[#5A9BC0]/60 border border-[#3B5A6A] text-[#D7D7D7] transition"
                  >
                     Batal
                  </Link>
                  <motion.button
                     whileHover={{ scale: 1.05, backgroundColor: "#F2C866" }}
                     whileTap={{ scale: 0.95 }}
                     type="submit"
                     className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#E7B750] text-black font-semibold shadow-md"
                  >
                     <PlusCircle className="w-5 h-5" /> Buat Catatan
                  </motion.button>
               </div>
            </form>
         </motion.div>
         <Notify
            show={notif.show}
            message={notif.message}
            type={notif.type}
            onClose={() => setNotif({ show: false, message: "", type: "info" })}
         />
      </motion.div>
   );
}
