import { useState } from "react";
import Interview from "../../Components/Interview/Interview";
import "./interview.scss";

export const InterviewPage = () => {
  const [interviewStarted, setInterviewStarted] = useState(false);
  return (
    <>
      {interviewStarted ? (
        <Interview closeCallback={setInterviewStarted} />
      ) : (
        <div className="dialog-page">
          <div className="dialog-page__content">
            <h2>Заголовок</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque et sapien ut quam dapibus condimentum. Vestibulum
              eget mauris quis tortor porta dictum. Etiam egestas non orci vel
              sagittis.
            </p>
            <button
              onClick={() => setInterviewStarted(true)}
              className="_button-white"
            >
              Начать
            </button>
          </div>
        </div>
      )}
    </>
  );
};

//export default InterviewPage;
