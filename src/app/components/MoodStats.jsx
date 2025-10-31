"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Smile, Meh, Frown } from "lucide-react";

export default function MoodStats() {
   const [stats, setStats] = useState({
      total: 0,
      senang: 0,
      biasa: 0,
      buruk: 0,
   });

   useEffect(() => {
      async function fetchStats() {
         try {
            const res = await fetch("/api/notes");
            const data = await res.json();

            // hitung mood
            const total = data.length;
            const senang = data.filter((n) => n.mood === "senang").length;
            const biasa = data.filter((n) => n.mood === "biasa").length;
            const buruk = data.filter((n) => n.mood === "buruk").length;

            setStats({ total, senang, biasa, buruk });
         } catch (err) {
            console.error("Gagal ambil data mood:", err);
         }
      }

      fetchStats();
   }, []);

   const items = [
      { icon: <FileText />, label: "Total Catatan", value: stats.total, color: "#E7B750" },
      { icon: <Smile />, label: "Mood Senang", value: stats.senang, color: "#5A9BC0" },
      { icon: <Meh />, label: "Mood Biasa", value: stats.biasa, color: "#E7B750" },
      { icon: <Frown />, label: "Mood Buruk", value: stats.buruk, color: "#B16D6D" },
   ];

   return (
      <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.3, duration: 0.6 }}
         className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6"
      >
         {items.map((item, idx) => (
            <motion.div
               key={idx}
               whileHover={{ scale: 1.05 }}
               transition={{ type: "spring", stiffness: 200 }}
               className="bg-[#3E6072] border border-[#3B5A6A] rounded-xl p-4 text-center"
            >
               <p className="text-sm text-[#A3B5BF] flex items-center justify-center gap-2">
                  {item.icon} {item.label}
               </p>
               <h3
                  className="text-2xl font-semibold mt-1"
                  style={{ color: item.color }}
               >
                  {item.value}
               </h3>
            </motion.div>
         ))}
      </motion.div>
   );
}
