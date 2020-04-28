import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioFeedback from './RadioFeedback';
import axios from 'axios';




export default function LabelButton(props) {
  const [open, setOpen] = React.useState(false);
  const [label, setLabel] = React.useState(false);
  
  

  const handleClickOpen = () => {

    setOpen(true);
  };

  const handleClose = () => {
    setLabel("no")
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    props.handleSubmit()
    // lenna tzid codek ahmed
  };
  


  const dis= ()=>
  {
    if(label===false)
      return (
        <Button onClick={handleSubmit} color="primary" disabled>
            Submit
          </Button>
      )

      return (
        <Button onClick={handleSubmit} color="primary" >
            Submit
          </Button>
      )
  }
  return (
    <React.Fragment>
      
      <Button size="large" color="primary" aria-label="large primary button" variant="outlined" onClick={handleClickOpen}>
      Submit Label
       </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill with the correct Label
          </DialogContentText>
          
          <RadioFeedback
            features={props.features}
            label={label}
            setLabel={setLabel}

          >

          </RadioFeedback>
          

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          {dis()}
            
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}