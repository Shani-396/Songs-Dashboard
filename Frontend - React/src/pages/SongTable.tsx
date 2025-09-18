import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getAllSongs } from "../services/songService";
import type { Song } from "../models/song";

export default function SongTable() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      setError(null);

      try {
        // API Request - Get All Songs
        const response = await getAllSongs();

        if (!response.success || !response.data || response.data.length === 0) {
          setError(response.message || "No songs found.");
          setSongs([]);
        } else {
          const formatted: Song[] = response.data.map((s: Song) => ({
            id: s.id,
            songName: s.songName,
            band: s.band,
            year: s.year,
          }));
          setSongs(formatted);
        }
      } catch {
        setError("Failed to fetch songs. Please try again later.");
        setSongs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "songName", headerName: "Song Name", flex: 1, minWidth: 150 },
    { field: "band", headerName: "Band", flex: 1, minWidth: 150 },
    { field: "year", headerName: "Year", width: 100 },
  ];

  return (
    <Box sx={{ height: 600, width: "100%", mt: 3, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        Songs List
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : (
        <DataGrid
          rows={songs}
          columns={columns}
          getRowId={(row) => row.id}
          autoHeight
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
          disableColumnSelector
          disableColumnFilter
          disableDensitySelector
          hideFooterSelectedRowCount
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#e0e0e0", 
              color: "#000000",          
              fontSize: 16,
              fontWeight: "bold",
              minHeight: 50,
              lineHeight: "50px",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        />
      )}
    </Box>
  );
}
