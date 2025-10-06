import Grid from '@mui/material/Grid';
import Item from './Item';

const MenuGrid = ({ items }) => {
  return (
    <Grid container spacing={2}>
      {items.map((item) => (
        <Grid key={item.id}>
          <Item item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuGrid;
