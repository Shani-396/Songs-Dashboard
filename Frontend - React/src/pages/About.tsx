import { Box, Typography, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import InfoIcon from "@mui/icons-material/Info";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PeopleIcon from "@mui/icons-material/People";

export default function About() {
    // Cards
    const sections = [
        {
            title: "About This App",
            description:
                "This is a music management dashboard built with React, TypeScript, and Material-UI. You can upload CSV files of songs, view them in a beautiful table, and explore music statistics dynamically.",
            icon: <InfoIcon fontSize="large" />,
            color: "#2196f3",
        },
        {
            title: "Our Features",
            description:
                "Upload your song lists, view tables of songs and bands, track music statistics, and enjoy interactive animations throughout the dashboard.",
            icon: <MusicNoteIcon fontSize="large" />,
            color: "#4caf50",
        },
        {
            title: "Our Team",
            description:
                "Developed by Shani Gavra, following best practices for clean code, modular architecture, and beautiful responsive UI.",
            icon: <PeopleIcon fontSize="large" />,
            color: "#ff9800",
        },
    ];

    return (
        <Box sx={{ px: 4, py: 6, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
                About This Project
            </Typography>

            <Box
                display="grid"
                gap={4}
                gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                }}
                alignItems="stretch"
            >
                {sections.map((section, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.3 }}
                    >
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: 6,
                                cursor: "default",
                                height: "100%", 
                                display: "flex",
                                flexDirection: "column",
                                "&:hover": {
                                    scale: 1.05,
                                    boxShadow: 10,
                                    transition: "all 0.3s ease",
                                },
                            }}
                        >
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    p: 4,
                                    flexGrow: 1, 
                                }}
                            >
                                <Box
                                    sx={{
                                        backgroundColor: section.color,
                                        borderRadius: "50%",
                                        width: 64,
                                        height: 64,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mb: 2,
                                        color: "#fff",
                                    }}
                                >
                                    {section.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                    {section.title}
                                </Typography>
                                <Typography variant="body1">{section.description}</Typography>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </Box>
        </Box>
    );
}
