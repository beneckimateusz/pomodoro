import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import clsx from 'clsx';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const shortcuts = [
  { keyCombination: 'Space', actionName: 'Toggle timer' },
  { keyCombination: 'Alt+P', actionName: 'Pomodoro' },
  { keyCombination: 'Alt+S', actionName: 'Short break' },
  { keyCombination: 'Alt+L', actionName: 'Long break' },
  { keyCombination: 'Alt+R', actionName: 'Reset timer' },
];

function KeyboardShortcutsCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <KeyboardIcon />
          </Avatar>
        }
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title="Keyboard shortcuts"
        subheader="Simplify your workflow"
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TableContainer>
            <Table>
              <TableBody>
                {shortcuts.map(({ keyCombination, actionName }) => (
                  <TableRow key={keyCombination}>
                    <TableCell>
                      <strong>{keyCombination}</strong>
                    </TableCell>
                    <TableCell>{actionName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default KeyboardShortcutsCard;
