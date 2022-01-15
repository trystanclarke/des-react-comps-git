import { useState } from "react/cjs/react.development";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import { useContext } from "react/cjs/react.development";
import { SpeakerProvider, SpeakerContext } from "../contexts/SpeakerContext";

const Session = ({ title, room }) => (
  <span className="session w-100">
    {title} <strong>Room: {room.name}</strong>
  </span>
);

const Sessions = () => {
  const { eventYear } = useContext(SpeakerFilterContext);
  const { speaker } = useContext(SpeakerContext);
  const sessions = speaker.sessions;

  return (
    <div className="sessionBox card h-250">
      {sessions
        .filter((session) => session.eventYear === eventYear)
        .map((session) => (
          <Session key={session.id} {...session} />
        ))}
    </div>
  );
};

const SpeakerImage = () => {
  const { speaker } = useContext(SpeakerContext);
  const { id, first, last } = speaker;

  return (
    <div className="speaker-img d-flex flex-row justify-content-center align-items-center h-300">
      <img
        className="contain-fit"
        src={`/images/speaker-${id}.jpg`}
        width="300"
        alt={`${first} ${last}`}
      />
    </div>
  );
};

const SpeakerFavorite = () => {
  const { speaker, updateRecord } = useContext(SpeakerContext);
  const [inTransition, setInTransition] = useState(false);
  const doneCallback = () => {
    setInTransition(false);
    console.log(
      `In SpeakerFavorite:doneCallback ${new Date().getMilliseconds()}`
    );
  };

  return (
    <div className="action padB1">
      <span
        onClick={() => {
          setInTransition(true);
          updateRecord(
            { ...speaker, favorite: !speaker.favorite },
            doneCallback
          );
        }}
      >
        <i
          className={
            speaker.favorite ? "fa fa-star orange" : "fa fa-star-o orange"
          }
        />{" "}
        Favourite{" "}
        {inTransition && <span className="fas fa-circle-notch fa-spin"></span>}
      </span>
    </div>
  );
};

function SpeakerDemographics() {
  const speaker = useContext(SpeakerContext);
  const { first, last, bio, company, twitterHandle, favorite } = speaker;

  return (
    <div className="speaker-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <SpeakerFavorite />
      <div>
        <p className="card-description">{bio}</p>
        <div className="social d-flex flex-row mt-4">
          <div className="company">
            <h5>Company</h5>
            <h6>{company}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

function Speaker({ speaker, updateRecord }) {
  const { showSessions } = useContext(SpeakerFilterContext);

  return (
    <SpeakerProvider speaker={speaker} updateRecord={updateRecord}>
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
        <div className="card card-height p-4 mt-4">
          <SpeakerImage />
          <SpeakerDemographics />
        </div>
        {showSessions && <Sessions />}
      </div>
    </SpeakerProvider>
  );
}

export default Speaker;
