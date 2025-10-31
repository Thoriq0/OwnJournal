"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Edit3, Save, Trash2, Calendar, Smile, Frown, Meh, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Notify from "@/app/components/notify";

export default function EditNotePage() {
   const [isEditing, setIsEditing] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [loading, setLoading] = useState(true);
   const { id } = useParams();
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [mood, setMood] = useState("biasa");
   const [date, setDate] = useState("");
   const [notif, setNotif] = useState({ show: false, message: "", type: "info" });

   const showNotif = (message, type = "info") => {
      setNotif({ show: true, message, type });
      setTimeout(() => setNotif({ show: false, message: "", type: "info" }), 3000);
   };

   useEffect(() => {
      if (!id) return;

      const fetchNote = async () => {
         const res = await fetch(`/api/notes/${id}`);
         const data = await res.json();
         setTitle(data.title);
         setContent(data.content);
         setMood(data.mood);
         setDate(data.date);
         setLoading(false);
      };
      fetchNote();
   }, [id]);

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center text-[#A3B5BF]">
            Memuat catatan...
         </div>
      );
   }

   const handleSave = async (e) => {
      e.preventDefault();
      try{
         const res = await fetch(`/api/notes/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content, mood, date }),
         });
         const text = await res.text();
         // console.log("Response raw:", text);
         if (!res.ok) {
            showNotif("Gagal menyimpan catatan!", "error");
            return;
         }
         setIsEditing(false);
         showNotif("Catatan berhasil disimpan!", "success");
      }catch (error) {
         console.error(error);
         showNotif("Terjadi kesalahan saat menyimpan.", "error");
      }
   };
   const moodIcons = {
      senang: <Smile className="inline w-4 h-4 text-[#5A9BC0]" />,
      biasa: <Meh className="inline w-4 h-4 text-[#E7B750]" />,
      buruk: <Frown className="inline w-4 h-4 text-[#B16D6D]" />,
   };
   const handleDelete = async () => {
      try {
         const res = await fetch(`/api/notes/${id}`, {
            method: "DELETE",
         });

         if (!res.ok) {
            const err = await res.text();
            console.error("Gagal hapus:", err);
            // alert("Gagal menghapus catatan!");
            showNotif("Gagal menghapus catatan!", "error");
            return;
         }

         const data = await res.json();
         // console.log("Catatan dihapus:", data);

         setShowDeleteModal(false);
         showNotif("Catatan berhasil dihapus!", "success");
         // alert("Catatan dihapus!");

         window.location.href = "/";
      } catch (error) {
         // console.error("Error delete:", error);
         // alert("Terjadi kesalahan saat menghapus catatan.");
         showNotif("Terjadi kesalahan saat menghapus catatan.", "error");
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

         <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-[#3E6072]/80 border border-[#3B5A6A] rounded-2xl shadow-lg p-6 sm:p-10 backdrop-blur-sm relative"
         >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
               <h1
                  className="text-2xl sm:text-3xl font-semibold text-[#E7E7E7]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
               >
                  {isEditing ? "Edit Catatan" : title}
               </h1>

               <div className="flex gap-2">
                  {!isEditing && (
                     <>
                        <button
                           onClick={() => setIsEditing(true)}
                           className="flex items-center gap-2 px-4 py-2 bg-[#5A9BC0]/80 hover:bg-[#5A9BC0] text-white rounded-xl transition"
                        >
                           <Edit3 className="w-4 h-4" /> Edit
                        </button>
                        <button
                           onClick={() => setShowDeleteModal(true)}
                           className="flex items-center gap-2 px-4 py-2 bg-[#B16D6D]/80 hover:bg-[#B16D6D] text-white rounded-xl transition"
                        >
                           <Trash2 className="w-4 h-4" /> Hapus
                        </button>
                     </>
                  )}
               </div>
            </div>

            {/* Date + Mood */}
            <div className="flex items-center gap-4 text-sm text-[#A3B5BF] mb-6">
               <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(date).toLocaleDateString("id-ID", {
                     day: "2-digit",
                     month: "short",
                     year: "numeric",
                  })}
               </span>
               <span className="flex items-center gap-2">
                  {moodIcons[mood]} Mood: <b className="capitalize">{mood}</b>
               </span>
            </div>

            {/* Content Section */}
            <AnimatePresence mode="wait">
               {isEditing ? (
                  <motion.form
                     key="edit"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     className="space-y-6"
                  >
                     {/* Judul */}
                     <div>
                        <label className="block text-sm text-[#A3B5BF] mb-2">Judul</label>
                        <input
                           type="text"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                           className="w-full p-3 rounded-xl bg-[#3E6072]/80 border border-[#3B5A6A] text-[#D7D7D7] focus:outline-none focus:ring-2 focus:ring-[#5A9BC0]"
                        />
                     </div>

                     {/* Tanggal */}
                     <div>
                        <label className="block text-sm text-[#A3B5BF] mb-2">Tanggal</label>
                        <input
                           type="date"
                           value={date}
                           onChange={(e) => setDate(e.target.value)}
                           className="w-full p-3 rounded-xl bg-[#3E6072]/80 border border-[#3B5A6A] text-[#D7D7D7] focus:outline-none focus:ring-2 focus:ring-[#5A9BC0]"
                        />
                     </div>

                     {/* Mood */}
                     <div>
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

                     {/* Isi Catatan */}
                     <div>
                        <label className="block text-sm text-[#A3B5BF] mb-2">Isi Catatan</label>
                        <textarea
                           rows={8}
                           value={content}
                           onChange={(e) => setContent(e.target.value)}
                           className="w-full p-3 rounded-xl bg-[#3E6072]/80 border border-[#3B5A6A] text-[#D7D7D7] focus:outline-none focus:ring-2 focus:ring-[#5A9BC0]"
                        />
                     </div>
                     {/* Tombol Simpan / Batal */}
                     <div className="flex justify-end gap-4 pt-4">
                        <button
                           onClick={() => setIsEditing(false)}
                           type="button"
                           className="px-5 py-2 rounded-xl bg-[#3E6072] hover:bg-[#5A9BC0]/60 border border-[#3B5A6A] text-[#D7D7D7] transition"
                        >
                           Batal
                        </button>
                        <motion.button
                           type="button"
                           onClick={handleSave}
                           whileHover={{ scale: 1.05, backgroundColor: "#F2C866" }}
                           whileTap={{ scale: 0.95 }}
                           className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#E7B750] text-black font-semibold shadow-md"
                        >
                           <Save className="w-5 h-5" /> Simpan
                        </motion.button>
                     </div>
                  </motion.form>
               ) : (
                  <motion.div
                     key="preview"
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                  >
                     <p className="leading-relaxed text-[#D7D7D7]/90 whitespace-pre-line">
                        {content}
                     </p>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.div>

         {/* Modal Delete */}
         <AnimatePresence>
            {showDeleteModal && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
               >
                  <motion.div
                     initial={{ scale: 0.9, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.9, opacity: 0 }}
                     className="bg-[#3E6072] border border-[#3B5A6A] rounded-2xl p-6 w-[90%] sm:w-[400px] text-center shadow-lg"
                  >
                     <h2 className="text-lg font-semibold mb-4 text-[#E7E7E7]">
                        Hapus Catatan?
                     </h2>
                     <p className="text-[#A3B5BF] mb-6">
                        Catatan ini akan dihapus secara permanen. Lanjutkan?
                     </p>
                     <div className="flex justify-center gap-4">
                        <button
                           onClick={() => setShowDeleteModal(false)}
                           className="px-4 py-2 bg-[#3E6072] hover:bg-[#5A9BC0]/60 border border-[#3B5A6A] text-[#D7D7D7] rounded-xl transition"
                        >
                           Batal
                        </button>
                        <button
                           onClick={handleDelete}
                           className="px-4 py-2 bg-[#B16D6D] hover:bg-[#C97A7A] text-white rounded-xl transition"
                        >
                           Hapus
                        </button>
                     </div>
                     <button
                        onClick={() => setShowDeleteModal(false)}
                        className="absolute top-3 right-3 text-[#A3B5BF] hover:text-[#E7B750]"
                     >
                        <X className="w-5 h-5" />
                     </button>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
         <Notify
            show={notif.show}
            message={notif.message}
            type={notif.type}
            onClose={() => setNotif({ show: false, message: "", type: "info" })}
         />
      </motion.div>
   );
}
