
import React, { useState } from 'react';
import "./home.scss";
import { Grid, Snackbar, Alert } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import generateLovePickupLine from './openAI.js';

function App() {

  const [heading, setHeading] = useState('');
  const [memeText, setMemeText] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');

  const closeLoading = () => {
    setLoading(false);
  };

  const handlePrompts = async () => {
    
    if (prompt === '') {
      setSnackbarOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage("Prompt text is empty");
      return;
    }

    setLoading(true);
      const message = "I'm looking for a romantic pickup line inspired by software engineering terms,"
        + " specifically the concept of a " + prompt + ". Can you provide me a pickup line (excluding 'Are you a')"
        + " along with a heading of three words ? "
        + "Please format the response as a JSON object with 'heading' and 'pickupLine' fields."
      const result = await generateLovePickupLine(message);
      const obj = JSON.parse(result);
      setHeading(obj.heading);
      setMemeText(obj.pickupLine);
      console.log(result);
      setLoading(false);
  }

  const schedulePost = (e) => {

    if (heading === '' || memeText === '' || pin === '') {
      setSnackbarOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage("Please fill all the fields");
      return;
    }

    if (pin !== '7417') {
      // setPinError(true);
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

    if (pin !== '3434') {
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

  return (<>
    <div className="content">
      <section className="center-heading">
        <div className="bold-heading">
          Generate <span className="hightlight-text">pick up lines</span> using ChatGPT
        </div>
      </section>
      <section className="main-content-container">
        <section className="main-content">
          <section className="search-container">
            <div className="pickupline-text">Pickup line content : </div>
            <input
              type="text"
              placeholder={"github/codbugs/agile"}
              required
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="search-box"
            />
          </section>
          <section className="getyourline-button">
            <button type="submit" className="search-button" onClick={handlePrompts}>
              Generate
            </button>
          </section>
        </section>
        <Grid item sx={{ marginY: '1%' }} />
        <section className="main-content">
          <section className="search-container">
            <input
              type="text"
              placeholder={"Heading"}
              required
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="search-box2"
            />
          </section>
          <Grid item sx={{ marginY: '4%' }} />
          <section className="search-container">
            <textarea
              type="text"
              required
              placeholder={"Meme text"}
              value={memeText}
              onChange={(e) => setMemeText(e.target.value)}
              rows="6"
              className="text-area"
            />
          </section>
          <Grid item sx={{ marginY: '4%' }} />
          <section className="search-container">
            <input
              type="text"
              placeholder={"Enter Pass Key"}
              required
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="search-box2"
            />
          </section>
          <section className="getyourline-button">
            <button type="submit" className="search-button2" onClick={schedulePost}>
              Schedule
            </button>
            <Grid item sx={{ marginX: '2%' }} />
            <div className="or-text">OR </div>
            <Grid item sx={{ marginX: '2%' }} />
            <button type="submit" className="search-button2" onClick={handleSubmit}>
              Post Now
            </button>
          </section>
        </section>
      </section>
      <Snackbar open={snackbarOpen} autoHideDuration={5000} onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Backdrop
        open={loading}
        onClick={closeLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  </>
  )
}

export default App;