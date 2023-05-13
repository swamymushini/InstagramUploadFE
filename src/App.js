import React, { useState } from 'react';
import { Button, TextField, Grid ,Box} from '@mui/material';
import { makeStyles } from '@mui/styles';

function App() {

  const gradientColors = 'linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)';
  const useStyles = makeStyles({
    root: {
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: '2px',
        borderColor: gradientColors,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
        backgroundImage: gradientColors,
        backgroundClip: 'padding-box',
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: gradientColors,
      },
    },
    gradientOutline: {
      background: 'none',
      borderImage: 'linear-gradient(to right, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)',
      borderImageSlice: '1',
      outline: 'none',
      borderWidth: '2px',
      borderRadius: '4px',
      padding: '8px',
      transition: 'border-color 0.3s ease',
      '&:focus': {
        borderColor: '#4f5bd5',
      },
    }
  });
  const classes = useStyles();

  const [heading, setHeading] = useState('');
  const [memeText, setMemeText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your Java API here to upload the meme with the heading and meme text
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

      <h2 style={{ background: gradientColors, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Upload Meme to Instagram
      </h2>
  
      <TextField
        id="heading"
        label="Heading"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
        sx={{
          width: '40%',
          '& .MuiOutlinedInput-input': {
            borderWidth: '2px',
          },
        }}
        InputProps={{
          classes: { root: classes.root },
        }}
        className={classes.gradientOutline}
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
        InputProps={{
          classes: { root: classes.root },
        }}
        className={classes.gradientOutline}
      />
  
      <Grid item container justifyContent="center" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            disabled
            sx={{
              backgroundImage: gradientColors,
              backgroundClip: 'padding-box',
              '&:hover': {
                backgroundImage: gradientColors,
              },
            }}
          >
            Schedule
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              backgroundImage: gradientColors,
              backgroundClip: 'padding-box',
              '&:hover': {
                backgroundImage: gradientColors,
              },
            }}
          >
            Post Now
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
