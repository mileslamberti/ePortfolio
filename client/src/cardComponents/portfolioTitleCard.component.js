import React, {useContext} from 'react';
import { Card, CardHeader, IconButton, makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DialogTitleCard from "./DialogTitleCard.component";

import {PortfolioCardContext} from "./portfolioCardContext";


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
    const [open, setOpen] = React.useState(false);

    const { editProjectInfo } = useContext(PortfolioCardContext);
    const { projectInfo } = useContext(PortfolioCardContext);


    const handleClickOpen = () =>{
        setOpen(true);
    };

    const handleDialogConfirm = (t, d) =>{
      editProjectInfo(t, d);
      setOpen(false);
    }

    const handleDialogCancel = () =>{
      setOpen(false);
    }

    return (
      <>
        <Card className={classes.root}>
            <CardHeader
                action={
                    <IconButton onClick={handleClickOpen}>
                        <EditIcon />
                    </IconButton>
                }
                title={projectInfo.title}
                subheader={projectInfo.subtitle}
            />
            
        </Card>
        <DialogTitleCard 
            handleDialogConfirm={handleDialogConfirm}
            handleDialogCancel={handleDialogCancel}
            open={open}
        />
      </>
    );
}

export default PortfolioTitleCard;