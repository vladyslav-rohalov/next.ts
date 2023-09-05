import FilterCommon from '../accordion/accordionCommon';
import { FormControl, Checkbox, Box } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { weight } from '@/app/utils/tmpData';

export default function WeightFilter({ items }) {
  const handleChecked = e => {
    console.log(e.target.checked);
    console.log(e.target.value);
    //need to fetch items
  };

  return (
    <FilterCommon title="Weight">
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
        component="form"
      >
        <Box
          component="ul"
          sx={{
            width: '100%',
            listStyle: 'none',
            pl: 2,
          }}
        >
          {items.map(({ id, weight }) => {
            return (
              <Box component="li" key={id}>
                <FormControlLabel
                  control={
                    <Checkbox value={weight} sx={{ p: 1 }} size="small" />
                  }
                  label={weight + ' grams'}
                  onClick={handleChecked}
                  sx={{
                    width: '100%',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'primary.dim' },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </FormControl>
    </FilterCommon>
  );
}
