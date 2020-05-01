import React from 'react'
import { Grid, ButtonGroup, Button, Container } from '@material-ui/core'
import LabelButton from 'components/LabelButton/LabelButton'

function ControlButton(props) {
  

    const handleSkip = () => {
    
        // lenna tzid codek ahmed
      };
    
      const handleExit=()=>{
        //lenna tzid elcode
      }
      
      const handleSubmit=()=>{
        props.getRow()
        
      }
    
    
    return (
        <React.Fragment>
            <Container>
    <div >
    <Grid container direction="column" justify="space-around" alignItems="center" spacing={5}>
      <Grid item >

    <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
      <Button onClick={handleSkip}>Skip</Button>
      <LabelButton features={props.features} handleSubmit={handleSubmit}></LabelButton>
      
      <Button onClick={handleExit}>Exit</Button>
    </ButtonGroup>
    </Grid></Grid>
        </div>
    </Container>
        </React.Fragment>
    )
}

export default ControlButton
