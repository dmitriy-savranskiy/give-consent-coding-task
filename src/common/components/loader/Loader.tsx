import { makeStyles } from '@material-ui/core';
import { tidLoader } from '../../testUtils/testIds';

const useStyles = makeStyles((theme) => ({
  loader: {
    ...theme.typography.body1,
  },
}));

export function Loader(): JSX.Element {
  const classes = useStyles();

  return (
    <span data-testid={tidLoader()} className={classes.loader}>
      Loading...
    </span>
  );
}
