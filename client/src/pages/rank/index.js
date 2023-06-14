import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Rank(props) {
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      location.state &&
      location.state.correctAnswers &&
      location.state.totalQuestions
    ) {
      (async () => {
        try {
          setLoading(true);
          const result = await axios.post(
            "http://localhost:7000/api/words/rank",
            {
              finalScore:
                (location.state.correctAnswers /
                  location.state.totalQuestions) *
                100,
            }
          );
          if (result) {
            setRank(result.data);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.error("Error calculating rank:", error);
        }
      })();
    }
  }, []);

  const handleTryAgain = () => {
    setRank(null);
    navigate("/");
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column my-5">
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          <h1>Activity Results</h1>
          {location.state && location.state.progress === 100 && rank ? (
            <>
              <div>
                <h2>Your Rank: {rank}</h2>
              </div>
            </>
          ) : (
            <>
              <p>You haven't finished the activity yet.</p>
            </>
          )}
          <button
            type="button"
            className="btn btn-info"
            onClick={handleTryAgain}
          >
            Try Again
          </button>
        </>
      )}
    </div>
  );
}

export default Rank;
