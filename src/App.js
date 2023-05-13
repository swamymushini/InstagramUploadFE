import React, { useState } from 'react';
import { Button, TextField, Grid, Snackbar, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';

function App() {

  const [heading, setHeading] = useState('');
  const [memeText, setMemeText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      heading: heading,
      imageText: memeText
    };

    fetch('https://u411m4oucg.execute-api.us-east-1.amazonaws.com/dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        setSnackbarOpen(true);
        if (response.ok) {
          setSnackbarSeverity('success');
          return response.json();
        } else {
          setSnackbarSeverity('error');
          throw new Error(response.statusText);
        }
      })
      .then(result => {
        setSnackbarMessage(result);
      })
      .catch(error => {
        setSnackbarMessage(error.message);
      });
  };



  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  return (
    <Grid
      container
      item
      justifyContent="center"
      spacing={2}
      direction="column"
      alignItems="center"
    >

      <Grid item sx={{ marginY: '0.5%' }} />

      <h2 >
        Upload Meme to Instagram
      </h2>

      <TextField
        id="heading"
        label="Heading"
        onChange={(e) => setHeading(e.target.value)}
        sx={{
          width: '40%',
          '& .MuiOutlinedInput-input': {
            borderWidth: '2px',
          },
        }}
      />

      <Grid item sx={{ marginY: '0.5%' }} />

      <TextField
        id="memeText"
        label="Meme Text"
        value={memeText}
        onChange={(e) => setMemeText(e.target.value)}
        multiline
        rows={4}
        maxLength={1000}
        sx={{
          width: '40%',
          '& .MuiOutlinedInput-input': {
            borderWidth: '2px',
          },
        }}
      />

      <Grid item container justifyContent="center" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
          >
            Schedule
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Post Now
          </Button>
        </Grid>
      </Grid>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default App;
