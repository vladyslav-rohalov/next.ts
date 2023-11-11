'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addFilter } from '@/app/redux/filters/slice';
import { useFilters } from '@/app/hooks/useFilters';
import { useForm, Controller } from 'react-hook-form';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function LimitFilter() {
  const { control, setValue } = useForm();
  const dispatch = useDispatch();
  const { limit, page, multiplier } = useFilters();
  const handleChange = currentLimit => {
    dispatch(addFilter({ filterName: 'limit', filterValue: currentLimit }));
    if (page !== 1) {
      dispatch(addFilter({ filterName: 'page', filterValue: 1 }));
    }
    if (multiplier !== 1) {
      dispatch(addFilter({ filterName: 'multiplier', filterValue: 1 }));
    }
  };

  useEffect(() => {
    setValue('limit', limit);
  }, [setValue, limit]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2, zIndex: 1 }}>
      <FormControl size="small" sx={{ width: 80 }}>
        <Controller
          control={control}
          name="limit"
          defaultValue={limit}
          value={limit}
          render={({ field: { onChange, value } }) => {
            return (
              <Select
                id="limit-select"
                value={value}
                onChange={e => {
                  onChange(e.target.value);
                  handleChange(e.target.value);
                }}
                sx={{
                  '&:hover': {
                    '& .labelSelect': {
                      color: 'red important!',
                    },
                  },
                }}
              >
                <MenuItem value={25}>
                  <em>25</em>
                </MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            );
          }}
        />
      </FormControl>
    </Box>
  );
}
