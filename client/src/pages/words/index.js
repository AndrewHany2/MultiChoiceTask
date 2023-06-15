import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Words(props) {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const totalQuestions = words.length;

  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:7000/api/words");
      if (result) {
        setWords(result.data);
        setCurrentWord(result.data[0]);
      }
    })();
  }, []);

  const answerQuestion = () => {
    let newAnsweredQuestions = answeredQuestions;
    newAnsweredQuestions++;
    setAnsweredQuestions(newAnsweredQuestions);
    let newProgress = (newAnsweredQuestions / totalQuestions) * 100;
    setProgress(newProgress);
  };

  const checkAnswer = (selectedPartOfSpeech) => {
    const isCorrect = selectedPartOfSpeech === currentWord.pos;
    if (isCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      toast.success("Correct Answer", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    } else {
      toast.error("Wrong Answer", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "light",
      });
    }
    setAnswerStatus(isCorrect);
    answerQuestion();
  };

  useEffect(() => {
    if (progress >= 100) {
      navigate("/rank", {
        state: {
          totalQuestions,
          correctAnswers,
          progress,
        },
      });
    }
    if (progress < 100) {
      setCurrentWord(words[Math.floor(Math.random() * words.length)]);
      setAnswerStatus(null);
    }
  }, [progress]);

  return (
    <>
      {words && words.length > 0 && (
        <div className="d-flex align-items-center justify-content-center flex-column my-5">
          <h1>
            <p>{currentWord ? currentWord.word : ""}</p>
          </h1>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              disabled={progress === 100}
              onClick={() => checkAnswer("noun")}
            >
              Noun
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={progress === 100}
              onClick={() => checkAnswer("adverb")}
            >
              Adverb
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={progress === 100}
              onClick={() => checkAnswer("adjective")}
            >
              Adjective
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={progress === 100}
              onClick={() => checkAnswer("verb")}
            >
              Verb
            </button>
          </div>
          <div className="progress my-3" style={{ width: "80%" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <button
            type="button"
            className="btn btn-info"
            onClick={answerQuestion}
            disabled={progress === 100}
          >
            Skip
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default Words;
