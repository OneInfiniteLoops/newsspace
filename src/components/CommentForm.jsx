import { postCommentByArticleID } from "../utils/api";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/User";

const CommentForm = ({ article_id, setCommentsList }) => {
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState({
    username: "",
    body: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  const handlePostInputs = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setNewComment((currNewComment) => {
      return { username: user, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setPostSuccess(false);
    setIsSubmitted(true);
    postCommentByArticleID(article_id, newComment).then(({ postedComment }) => {
      postedComment["author"] = postedComment["username"];
      setCommentsList((currCommentsList) => {
        return [...currCommentsList, postedComment];
      });
      setPostSuccess(true);
      setIsSubmitted(false);
    });
  };

  if (!user) {
    return (
      <p className="comment-form">
        💬 Please sign in to join the conversation.
      </p>
    );
  }

  if (user && postSuccess === true) {
    return (
      <div className="comment-form">
        <h3 className="postMsg">Comment Posted Successfully!</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            name="body"
            onChange={handlePostInputs}
            value={newComment.body}
            placeholder="Post a comment here"
            required
            cols="60"
            rows="3"
          ></textarea>
          <button className="submit-button" disabled={isSubmitted}>
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <textarea
          type="text"
          name="body"
          onChange={handlePostInputs}
          value={newComment.body}
          placeholder="Post a comment here"
          required
          cols="60"
          rows="3"
        ></textarea>
        <button className="submit-button" disabled={isSubmitted}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default CommentForm;
