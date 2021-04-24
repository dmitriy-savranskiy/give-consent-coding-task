import { ListItem, List, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

export type LayoutProps = {
  children: JSX.Element;
};

const links = [
  {
    link: '/give-consent',
    label: 'Give consent',
  },
  {
    link: '/consents',
    label: 'Collected consents',
  },
] as const;

const useStyles = makeStyles((theme) => ({
  navLink: {
    ...theme.typography.button,
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  navLinkActive: {
    fontWeight: 'bold',
  },
  navContainer: {
    borderRight: `1px solid ${theme.palette.divider}`,
    height: '100vh',
  },
  layoutWrapper: {
    display: 'flex',
  },
  content: {
    padding: '1rem',
    flexGrow: 1,
  },
}));

export function Layout(props: LayoutProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.layoutWrapper}>
      <nav className={classes.navContainer}>
        <List>
          {links.map(({ link, label }) => (
            <NavLink
              key={link}
              className={classes.navLink}
              activeClassName={classes.navLinkActive}
              to={link}
            >
              <ListItem button>{label}</ListItem>
            </NavLink>
          ))}
        </List>
      </nav>
      <main className={classes.content}>
        <Container>{props.children}</Container>
      </main>
    </div>
  );
}
