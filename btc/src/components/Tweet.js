import React, { useState } from "react";
import "../styles/ChartComponentStyle.css";

const Tweet = (props) => {
  // const [tweetUrls] = useState(props.urls);
  // const tweetUrlsTag = tweetUrls.map((element) => (
  //   <p key={element}>
  //     <a key={element} target={"_blank"} href={element}>
  //       {element}
  //       {"  "}
  //     </a>
  //   </p>
  // ));

  return (
    <div className="TweetContainer">
      <div className="TweetTitleContainer">
        <h1>{props.name}</h1>

        <h3>{props.tweetDate}</h3>
      </div>
      <hr className="TweetSeparator"></hr>
      <div className="TweetTextContainer">
        <p>{props.text}</p>
        {/* {tweetUrlsTag} */}
      </div>
    </div>
  );
};

export default Tweet;
