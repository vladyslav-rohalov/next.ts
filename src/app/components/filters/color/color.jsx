import { useForm } from 'react-hook-form';
import FilterCommon from '../accordion/accordionCommon';
import { Checkbox, Typography } from '@mui/material';
import SquareIcon from '@mui/icons-material/Square';
import { Form, Row, RowCenter, Label, List } from '@/app/utils/commonStyles';
import { debounce } from 'lodash';

export default function ColorFilter({ items }) {
  const { register, getValues } = useForm();

  const handleChecked = debounce(() => {
    // send request
    const values = getValues('color');
    console.log(values);
  }, 1000);

  return (
    <FilterCommon title="Color">
      <Form component="form">
        <List component="ul" sx={{ pl: 2 }}>
          {items.map(({ id, color }) => {
            return (
              <Row component="li" key={id}>
                <Label
                  control={
                    <Checkbox
                      value={color}
                      sx={{ p: 1 }}
                      size="small"
                      {...register('color', {
                        onChange: handleChecked,
                      })}
                    />
                  }
                  label={
                    <RowCenter sx={{ gap: 1 }}>
                      <SquareIcon
                        fontSize="small"
                        style={{
                          stroke: '#000',
                          fill: color,
                        }}
                      />
                      <Typography>{color}</Typography>
                    </RowCenter>
                  }
                />
              </Row>
            );
          })}
        </List>
      </Form>
    </FilterCommon>
  );
}
