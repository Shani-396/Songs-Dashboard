import { useState, useCallback } from "react";
import { Box, Button, Typography, Alert, CircularProgress, Paper, List, ListItem, ListItemText } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDropzone } from "react-dropzone";
import { uploadCsvFile } from "../services/songService";
import type { ApiResponse } from "../services/types";

export default function UploadCsv() {
    const [files, setFiles] = useState<File[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setMessage(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "text/csv": [".csv"] },
        multiple: false,
    });

    const handleUpload = async () => {
        if (files.length === 0) {
            setMessage("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            // API Request - Upload CSV File
            const response: ApiResponse = await uploadCsvFile(files[0]);
            if (!response.success) {
                setMessage(`Upload failed: ${response.message}`);
                setLoading(false);
                return;
            }

            setMessage(`File "${files[0].name}" uploaded successfully.`);
            setFiles([]);
        } catch (error) {
            setMessage("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 5 }}
        >
            <Paper
                {...getRootProps()}
                sx={{
                    p: 4,
                    border: "2px dashed #1976d2",
                    borderRadius: 3,
                    width: 400,
                    textAlign: "center",
                    bgcolor: isDragActive ? "#e3f2fd" : "#f5f5f5",
                    cursor: "pointer",
                    boxShadow: 3,
                }}
            >
                <input {...getInputProps()} />
                <CloudUploadIcon sx={{ fontSize: 60, color: "#1976d2", mb: 2 }} />
                <Typography variant="h6">
                    {isDragActive ? "Drop the CSV file here..." : "Drag & Drop CSV here or click to select"}
                </Typography>
            </Paper>

            {files.length > 0 && (
                <Box sx={{ mt: 3, width: 400 }}>
                    <Typography variant="subtitle1">Selected file:</Typography>
                    <List>
                        {files.map((file) => (
                            <ListItem key={file.name} divider>
                                <ListItemText primary={file.name} secondary={`${file.size} bytes`} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                sx={{ mt: 3 }}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                disabled={loading}
            >
                {loading ? "Uploading..." : "Upload"}
            </Button>

            {message && (
                <Alert
                    severity={message.includes("failed") ? "error" : "success"}
                    sx={{ mt: 2, width: 400 }}
                >
                    {message}
                </Alert>
            )}
        </Box>
    );
}
