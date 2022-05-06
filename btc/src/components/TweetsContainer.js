import React, { useState, useEffect } from "react";
import Tweet from "./Tweet";
import "../styles/ChartComponentStyle.css";

// Fetch tweetow z tweetera i stan ktory
// mapujemy by utworzyc Komponent Tweet

const TweetsContainer = () => {
  const [tweet, setTweet] = useState([]);

  useEffect(() => {
    fetch("/api/jsonify_tweet_list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTweet([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="TweetsContainer">
      {tweet.map((e) => (
        <Tweet
          key={e.unique_author_id}
          name={e.author_name}
          text={e.text}
          tweetDate={e.created_at}
          urls={e.urls}
        ></Tweet>
      ))}
    </div>
  );
};

export default TweetsContainer;
