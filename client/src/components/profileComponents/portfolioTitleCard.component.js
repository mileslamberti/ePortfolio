import React, {useState} from 'react';
import { Card, CardHeader, IconButton, makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitleCard from "./DialogTitleCard.component";



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
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () =>{
        setOpen(true);
    };

    const handleDialogConfirm = (t, d) =>{
      console.log(t, d)
      setTitle(t);
      setDescription(d);
      console.log(title, description);
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
                    <IconButton>
                        <EditIcon onClick={handleClickOpen}/>
                    </IconButton>
                }
                title={title}
                subheader={description}
            />
            
        </Card>
        {console.log(title)}
        <DialogTitleCard 
            handleDialogConfirm={handleDialogConfirm}
            handleDialogCancel={handleDialogCancel}
            open={open}
            title={title}
            description={description}
        />
      </>
    );
}

export default PortfolioTitleCard;