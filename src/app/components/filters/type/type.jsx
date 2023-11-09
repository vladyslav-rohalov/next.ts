import { useDispatch } from 'react-redux';
import { addFilter, removeFilter } from '@/app/redux/filters/slice';
import { useFilters } from '@/app/hooks/useFilters';
import AccordionCommon from '../accordion/accordionCommon';
import { Checkbox, Box, Typography } from '@mui/material';
import { Form, Label, List } from '@/app/lib/commonStyles';
import { visuallyHidden } from '@mui/utils';
import { Counter, Row } from '@/app/lib/commonStyles';

export default function TypeFilter({ items }) {
  const typeCountsArr = Object.entries(items).map(([type, count]) => ({
    type,
    count,
  }));
  const { type } = useFilters();
  const dispatch = useDispatch();
  console.log(type);
  const handleChecked = (checked, curentType) => {
    const filter = { filterName: 'type', filterValue: curentType };
    console.log('checked =', checked, filter);
    checked ? dispatch(addFilter(filter)) : dispatch(removeFilter(filter));
  };

  return (
    <AccordionCommon title="Type">
      <Typography component="h3" sx={visuallyHidden}>
        Search hookah accessories by type
      </Typography>
      <Form component="form">
        <List component="ul" sx={{ pl: 2 }}>
          {typeCountsArr.map(item => {
            return (
              <Box component="li" key={item.type}>
                <Label
                  label={
                    <Row>
                      <Counter badgeContent={item.count}>
                        <Typography sx={{ color: 'primary.dim' }}>
                          {item.type}
                        </Typography>
                      </Counter>
                    </Row>
                  }
                  control={
                    <Checkbox
                      value={type}
                      checked={type.includes(item.type.toLowerCase())}
                      sx={{ p: 1 }}
                      size="small"
                      onChange={(e, checked) => {
                        console.log(checked);
                        handleChecked(checked, item.type.toLowerCase());
                      }}
                    />
                  }
                />
              </Box>
            );
          })}
        </List>
      </Form>
    </AccordionCommon>
  );
}
