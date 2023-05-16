import React, { useState } from 'react';
import { Button, TextField, Grid, Snackbar, Alert } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
function App() {

  const [heading, setHeading] = useState('');
  const [memeText, setMemeText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [loading, setLoading] = useState(false);

  const closeLoading = () => {
    setLoading(false);
  };

  const schedulePost = (e) => {

    if (heading === '' || memeText === '' || pin === '') {
      setSnackbarOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage("Please fill all the fields");
      return;
    }

    if (pin !== '7417') {
      setPinError(true);
      setSnackbarSeverity('error');
      setSnackbarMessage("Enter correct pin");
      setSnackbarOpen(true);
      return;
    }
    setPinError(false);

    e.preventDefault();

    const data = {
      type: 'SCHEDULE',
      payload: {
        heading: heading,
        imageText: memeText
      }
    };

    setLoading(true);
    fetch('https://tb6x8fwl43.execute-api.us-east-1.amazonaws.com/dev/scheduler', {
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
        setLoading(false);
        setSnackbarMessage("Post scheduled successfully");
      })
      .catch(error => {
        setLoading(false);
        setSnackbarMessage(error.message);
      });
  };

  const handleSubmit = (e) => {

    if (heading === '' || memeText === '' || pin === '') {
      setSnackbarOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage("Please fill all the fields");
      return;
    }

    if (pin !== '7417') {
      setPinError(true);
      setSnackbarSeverity('error');
      setSnackbarMessage("Enter correct pin");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    setPinError(false);
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
        setLoading(false);
        setSnackbarMessage(result);
      })
      .catch(error => {
        setLoading(false);
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
      sx={{
        maxWidth: '80%',
        margin: '0 auto',
        '@media (max-width: 60%)': {
        },
      }}
    >
      <Grid item sx={{ marginY: '0.5%' }} />

      <h2 style={{ color: '#D41343' }}>Upload Meme to Instagram</h2>

      <TextField
        id="heading"
        label="Heading"
        required
        onChange={(e) => setHeading(e.target.value)}
        sx={{
          width: '100%',
          maxWidth: '400px',
          '& .MuiOutlinedInput-input': {
            borderWidth: '2px',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0D92A5',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#D41343',
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
        required
        rows={4}
        maxLength={1000}
        sx={{
          width: '100%',
          maxWidth: '400px',
          '& .MuiOutlinedInput-input': {
            borderWidth: '2px',
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#0D92A5',
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#D41343',
          },
        }}
      />
      <Grid item sx={{ marginY: '0.5%' }} />

      <Grid item container justifyContent="center" spacing={2}>

        <TextField
          id="pin"
          label="PIN"
          type="number"
          required
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          error={pinError}
          helperText={pinError ? 'PIN is incorrect' : ''}
          sx={{
            width: '100%',
            maxWidth: '150px',
            '& .MuiOutlinedInput-input': {
              borderWidth: '2px',
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#0D92A5',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#D41343',
            },
          }}
        />

        <Grid item>
          <Button
            variant="contained"
            onClick={schedulePost}
            sx={{
              backgroundColor: '#0D92A5',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#0D92A5',
              },
            }}
          >
            Schedule
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#D41343',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#D41343',
              },
            }}
          >
            Post Now
          </Button>
        </Grid>
        <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
          onClick={closeLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </Grid>
  );
}

export default App;
