import { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { getAllSongs } from "../services/songService";
import type { Song } from "../models/song";

export default function Dashboard() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const response = await getAllSongs();
        if (response.success && response.data) {
          setSongs(response.data);
        } else {
          setSongs([]);
        }
      } catch {
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const totalSongs = songs.length;
  const totalBands = Array.from(new Set(songs.map(s => s.band))).length;
  const oldestYear = songs.length > 0 ? Math.min(...songs.map(s => s.year)) : "-";
  const newestYear = songs.length > 0 ? Math.max(...songs.map(s => s.year)) : "-";

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  const cards = [
    { title: "Total Songs", value: totalSongs, color: "#2196f3" },
    { title: "Total Bands", value: totalBands, color: "#4caf50" },
    { title: "Oldest Song Year", value: oldestYear, color: "#ff9800" },
    { title: "Newest Song Year", value: newestYear, color: "#f44336" },
  ];

  return (
    <Box sx={{ px: 4, py: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
        🎵 Music Dashboard
      </Typography>

      {/* Grid cards */}
      <Box
        display="grid"
        gap={4}
        gridTemplateColumns={{
          xs: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card
              sx={{
                backgroundColor: card.color,
                color: "#fff",
                borderRadius: 3,
                boxShadow: 6,
                cursor: "pointer",
                "&:hover": { scale: 1.05, boxShadow: 10, transition: "all 0.3s ease" },
              }}
            >
              <CardContent>
                <Typography variant="h6">{card.title}</Typography>
                <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
                  {card.value}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Quick Stats */}
      <Box mt={6}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <Typography variant="h5" gutterBottom>
            Quick Stats Table
          </Typography>
          <Box sx={{ mt: 2, backgroundColor: "#fff", p: 2, borderRadius: 3, boxShadow: 3 }}>
            <Typography>Total Songs: {totalSongs}</Typography>
            <Typography>Total Bands: {totalBands}</Typography>
            <Typography>Oldest Song Year: {oldestYear}</Typography>
            <Typography>Newest Song Year: {newestYear}</Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
