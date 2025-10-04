import { useState, type MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Avatar,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTranslation } from "react-i18next";
import SettingsMenu from "./SettingsMenu";

type Props = {
  city: string;
  onCityChange: (v: string) => void;
  onRefresh: () => void;
};

export default function Header({ city, onCityChange, onRefresh }: Props) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider", mb: 3, bgcolor: "background.paper" }}
    >
      <Toolbar sx={{ gap: 2, justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src="/img/logo.png" sx={{ bgcolor: "primary.main" }} />
          <Typography variant="h6" color="text.primary">
            {t("logo_name")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            size="small"
            sx={{ minWidth: 240 }}
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder={t("search_location") || "Search Your Location"}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button onClick={onRefresh} startIcon={<RefreshIcon />}>
            {t("refresh")}
          </Button>

          <IconButton onClick={openMenu} aria-label="settings">
            <SettingsIcon  sx={(theme) => ({
    color:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.text.primary,
  })} />
          </IconButton>
          <SettingsMenu anchorEl={anchorEl} onClose={closeMenu} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
