import * as Sentry from "@sentry/react";
import React from "react";
import ReactDOM from "react-dom";

Sentry.init({
  dsn: "https://33f3f99d7064495b95ccacfb9225bbbf@o447951.ingest.us.sentry.io/4504689757257728",
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
    }),
  ],
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 0.0,
  debug: true,
});

// tried testing if console logs or errors happening before
// I start the replay are captured within the replay or not.
// turns out they're not captured
setTimeout(() => {
  console.log("Something");
  throw new Error("Test Error");
}, 4000);

class StartReplay extends React.Component {
  render() {
    return (
      <button
        onClick={() => {
          const replay = Sentry.getReplay();
          replay?.flush();
          replay?.start();
          console.log("Starting the replay");
        }}
      >
        START REPLAY
      </button>
    );
  }
}

class StopReplay extends React.Component {
  render() {
    return (
      <button
        onClick={() => {
          const replay = Sentry.getReplay();
          console.log("Stopping the replay");
          replay?.stop();
        }}
      >
        STOP REPLAY
      </button>
    );
  }
}

ReactDOM.render(
  [<StartReplay />, <button>click</button>, <StopReplay />],
  document.getElementById("root")
);
