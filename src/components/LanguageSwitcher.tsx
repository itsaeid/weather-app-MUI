import i18n from '../translate';
import { MenuItem, Select } from '@mui/material';

export default function LanguageSwitcher() {
  const value = i18n.language;
  const change = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    window.location.reload();
  };

  return (
    <Select value={value} onChange={(e) => change(String(e.target.value))} size='small' sx={{width: "auto"}}>
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="fa">فارسی</MenuItem>
    </Select>
  );
}