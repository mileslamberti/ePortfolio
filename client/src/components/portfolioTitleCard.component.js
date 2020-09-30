import React, {useState} from 'react';
import { Card, CardHeader, IconButton, makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

function PortfolioTitleCard(props){
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                }
                title={props.title}
                subheader={props.description}
            />
        </Card>
    );
}

export default PortfolioTitleCard;