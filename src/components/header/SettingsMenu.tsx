import { Box, Menu, Typography, Switch, FormControlLabel, Button } from "@mui/material";
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { useThemeMode } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

type Props = { anchorEl: HTMLElement | null; onClose: () => void };

export default function SettingsMenu({ anchorEl, onClose }: Props) {
  const { t } = useTranslation();
  const themeMode = useThemeMode();
  const { logout } = useAuth();

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Box sx={{ p: 2, width: 260 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
         {t("mode")} 
        </Typography>
        <FormControlLabel
          control={<Switch checked={themeMode.mode === "dark"} onChange={themeMode.toggle} />}
          label={themeMode.mode === "dark" ? t("Dark") : t("Light")}
        />

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          {t("language")}
        </Typography>
        <LanguageSwitcher />

        <Box sx={{ mt: 2 }}>
          <Button
            fullWidth
            onClick={() => {
              logout();
              onClose();
            }}
          >
            {t("logout_button")}
          </Button>
        </Box>
      </Box>
    </Menu>
  );
}
