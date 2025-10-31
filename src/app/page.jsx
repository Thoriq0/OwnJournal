"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import MoodStats from "./components/MoodStats";
import NoteCard from "./components/NoteCard";

export default function HomePage() {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [moodFilter, setMoodFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchNotes() {
      try {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
        setFilteredNotes(data);
      } catch (err) {
        console.error("Gagal fetch notes:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  useEffect(() => {
    let filtered = notes;

    if (moodFilter) {
      filtered = filtered.filter((n) => n.mood === moodFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter((n) => n.date.startsWith(dateFilter));
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      );
    }

    setFilteredNotes(filtered);
  }, [moodFilter, dateFilter, searchQuery, notes]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-[#273F4F] text-[#D7D7D7] p-4 sm:p-6 md:p-8"
    >
      <Header onSearch={setSearchQuery} />
      <FilterBar onMoodChange={setMoodFilter} onDateChange={setDateFilter} />
      <MoodStats notes={filteredNotes} />

      {loading ? (
        <p className="text-center text-[#A3B5BF] animate-pulse">
          Loading catatan...
        </p>
      ) : filteredNotes.length === 0 ? (
        <p className="text-center text-[#A3B5BF]">Belum ada catatan 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              date={new Date(note.date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
              id={note.id}
              mood={note.mood}
              title={note.title}
              content={note.content}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
