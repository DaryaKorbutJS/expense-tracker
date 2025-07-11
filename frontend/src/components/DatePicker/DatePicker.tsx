import { useState, useRef, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box,
  ClickAwayListener,
  IconButton,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import styles from './DatePicker.module.css';
import CalendarSvg from '../../assets/calendar.svg?react';

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

const getDaysGrid = (month: Dayjs) => {
  const startOfMonth = month.startOf('month');
  const daysInMonth = month.daysInMonth();
  const startDay = (startOfMonth.day() + 6) % 7;

  const days: (number | null)[] = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return days;
};

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
}

export const CustomDatePicker = ({ value, onChange }: DatePickerProps) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const selectedDate = value ? dayjs(value) : dayjs();
  const [calendarMonth, setCalendarMonth] = useState<Dayjs>(selectedDate.startOf('month'));

  useEffect(() => {
    if (value) {
      setCalendarMonth(dayjs(value).startOf('month'));
    }
  }, [value]);

  const handleSelect = (day: number | null) => {
    if (!day) return;
    const newDate = calendarMonth.date(day);
    onChange(newDate.format('YYYY-MM-DD'));
  };

  const days = getDaysGrid(calendarMonth);

  return (
    <Box ref={anchorRef} sx={{ position: 'relative', width: 320 }}>
      <TextField
        fullWidth
        value={selectedDate.format('DD/MM/YYYY')}
        onClick={() => setOpen((prev) => !prev)}
        InputProps={{
          readOnly: true,
          endAdornment: <CalendarSvg className={styles.icon} />,
        }}
        sx={{
          cursor: 'pointer',
          '& .MuiOutlinedInput-root': {
            paddingRight: 0,
            borderRadius: '8px',
            backgroundColor: '#fff',
          },
        }}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        style={{ zIndex: 1500, marginTop: 8 }}
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper elevation={4} sx={{ borderRadius: 2, width: 320 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                borderBottom: '1px solid #f3f4f6',
              }}
            >
              <IconButton size="small" onClick={() => setCalendarMonth(calendarMonth.subtract(1, 'month'))} aria-label="Go to previous month">
                <ChevronLeft />
              </IconButton>
              <Typography fontWeight={600}>{calendarMonth.format('MMMM YYYY')}</Typography>
              <IconButton size="small" onClick={() => setCalendarMonth(calendarMonth.add(1, 'month'))} aria-label="Go to next month">
                <ChevronRight />
              </IconButton>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" px={2} mt={2} mb={1}>
              {weekDays.map((day) => (
                <Typography key={day} align="center" fontSize={12} fontWeight={500} color="#6b7280">
                  {day}
                </Typography>
              ))}
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" px={2} mb={2}>
              {days.map((day, index) => {
                const isSelected =
                  day &&
                  selectedDate.date() === day &&
                  selectedDate.month() === calendarMonth.month() &&
                  selectedDate.year() === calendarMonth.year();
                return (
                  <Box
                    key={index}
                    component="button"
                    onClick={() => handleSelect(day)}
                    disabled={!day}
                    sx={{
                      width: 40,
                      height: 40,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: isSelected ? '#3b82f6' : 'transparent',
                      color: isSelected ? '#fff' : '#374151',
                      fontWeight: isSelected ? 600 : 400,
                      cursor: day ? 'pointer' : 'default',
                      '&:hover': {
                        backgroundColor: day ? (isSelected ? '#2563eb' : '#f3f4f6') : 'transparent',
                      },
                    }}
                  >
                    {day}
                  </Box>
                );
              })}
            </Box>
            <Box sx={{ borderTop: '1px solid #f3f4f6', px: 2, py: 2, textAlign: 'right' }}>
              <button
                onClick={() => setOpen(false)}
                style={{
                  padding: '8px 24px',
                  backgroundColor: '#3b82f6',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Set Date
              </button>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};
