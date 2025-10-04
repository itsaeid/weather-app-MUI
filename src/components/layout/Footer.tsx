// src/components/layout/Footer.tsx
import * as React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import i18n from "../../translate";
import { t } from "i18next";

type Props = {
  email?: string;
};

export default function Footer({
  email = "info@nadin.ir",
}: Props) {
  const theme = useTheme();

  const [now, setNow] = React.useState<Date>(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const timeStr = now.toLocaleTimeString(i18n.language, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateStr = now.toLocaleDateString(i18n.language, {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const gradient =
    theme.palette.mode === "light"
      ? "linear-gradient(90deg,#E9F3F7 0%, #E3EFF4 25%, #E3EFF4 75%, #E9F3F7 100%)"
      : "linear-gradient(90deg,#0E1A27 0%, #0B1622 25%, #0B1622 75%, #0E1A27 100%)";

  return (
    <Box
      sx={{
        mt: 4,
        py: 2.25,
        background: gradient,
        width: "100"
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Box
              component="img"
              src="/img/nadinlogo1.png"            
              alt="logo"
              sx={{
                width: 36,
                height: 36,
                objectFit: "contain",
                
              }}
            />
            <Typography
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 500 }}
            >
              {t("copy_right")}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={{ xs: 3, md: 4 }}
            alignItems="center"
            flexWrap="wrap"
            sx={{ color: "text.primary" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <MailOutlineIcon fontSize="small" />
              <Typography variant="body2">
                contact us : {email}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarMonthOutlinedIcon fontSize="small" />
              <Typography variant="body2">
                {timeStr} · {dateStr}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
