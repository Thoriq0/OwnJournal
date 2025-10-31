"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info } from "lucide-react";

export default function Notify({ message, type = "info", show, onClose }) {
   useEffect(() => {
      if (!show) return;
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
   }, [show, onClose]);

   const variants = {
      success: {
         icon: <CheckCircle className="w-5 h-5 text-green-400" />,
         bg: "bg-green-900/90 border-green-700 text-green-100",
      },
      error: {
         icon: <XCircle className="w-5 h-5 text-red-400" />,
         bg: "bg-red-900/90 border-red-700 text-red-100",
      },
      info: {
         icon: <Info className="w-5 h-5 text-blue-400" />,
         bg: "bg-blue-900/90 border-blue-700 text-blue-100",
      },
   };

   const { icon, bg } = variants[type] || variants.info;

   return (
      <AnimatePresence>
         {show && (
            <motion.div
               initial={{ opacity: 0, y: -20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
               className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bg}`}
            >
               {icon}
               <span className="text-sm font-medium">{message}</span>
            </motion.div>
         )}
      </AnimatePresence>
   );
}
