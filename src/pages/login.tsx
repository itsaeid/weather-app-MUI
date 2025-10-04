// pages/Login.tsx
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useThemeMode } from "../contexts/ThemeContext";
import { t as tGlobal } from "i18next";

const schema = z.object({
  name: z.string().min(1, tGlobal("form_placeholder")).max(50),
});
type Form = z.infer<typeof schema>;

export default function Login() {
  const { t, i18n } = useTranslation();
  const { login } = useAuth();
  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const { mode, toggle } = useThemeMode();
  const dir = i18n.dir();

  const onSubmit = (data: Form) => login(data.name.trim());

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        py: { xs: 4, md: 8 },
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 980,
          overflow: "hidden",
          display: "flex",
          flexDirection: {
            xs: "column",
            md: dir === "rtl" ? "row-reverse" : "row",
          },
          position: "relative",
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            flex: 1,
            minHeight: { xs: 240, md: 520 },
            position: "relative", 
            background:
              mode === "light"
                ? "#D3E1E7"
                : "#3E4660",
          }}
        >
          <Box
            component="img"
            src="/img/login2.png" 
            alt=""
            sx={{
              position: { xs: "static", md: "absolute" },
              top: { md: 28 },
              insetInlineEnd: { md: 56 }, 
              width: { xs: 90, md: 220 },
              height: "auto",
              display: "block",
              mx: { xs: "auto", md: 0 },
              my: { xs: 2, md: 0 },
              filter:
                mode === "dark"
                  ? "drop-shadow(0 24px 40px rgba(0,0,0,.45))"
                  : "drop-shadow(0 20px 30px rgba(0,0,0,.18))",
            }}
          />

          <Box
            component="img"
            src="/img/login1.png" 
            alt=""
            sx={{
              position: { xs: "static", md: "absolute" },
              top: { md: 160 },
              insetInlineStart: { md: 44 },
              width: { xs: 100, md: 150 },
              height: "auto",
              display: "block",
              mx: { xs: "auto", md: 0 },
              my: { xs: 2, md: 0 },
              filter:
                mode === "dark"
                  ? "drop-shadow(0 24px 40px rgba(0,0,0,.45))"
                  : "drop-shadow(0 20px 30px rgba(0,0,0,.18))",
            }}
          />

          <Box
            component="img"
            src="/img/login3.png" 
            alt=""
            sx={{
              position: { xs: "static", md: "absolute" },
              bottom: { md: 32 },
              insetInlineEnd: { md: 70 },
              width: { xs: 110, md: 220 },
              height: "auto",
              display: "block",
              mx: { xs: "auto", md: 0 },
              my: { xs: 2, md: 0 },
              filter:
                mode === "dark"
                  ? "drop-shadow(0 24px 40px rgba(0,0,0,.45))"
                  : "drop-shadow(0 20px 30px rgba(0,0,0,.18))",
            }}
          />
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ display: { xs: "none", md: "block" } }}
        />

        {/* form */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2.5,
            background: mode === "light"
                ? "#fff"
                : "#292f45",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Typography variant="h6" fontWeight={700}>
              {t("login_title")}
            </Typography>

            <Button
              onClick={toggle}
              variant="outlined"
              size="small"
              sx={{ minWidth: 40, px: 1.25 }}
              aria-label="toggle theme"
              title={mode === "dark" ? "Switch to light" : "Switch to dark"}
            >
              {mode === "dark" ? "☀️" : "🌙"}
            </Button>
          </Stack>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label={t("enter_name")}
                  fullWidth
                  required
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, py: 1.25 }}
            >
              {t("login_button")}
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ textAlign: "center", mt: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{fontSize: '20px'}}>
          {t("language")}
        </Typography>
        <Box sx={{ mt: 0.5 }}>
          <LanguageSwitcher />
        </Box>
      </Box>
    </Container>
  );
}
