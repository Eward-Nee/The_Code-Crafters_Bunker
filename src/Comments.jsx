import { useEffect, useState } from "react"
import "./Comments.css"

function Comments() {
    const apiUrl = "https://catherine-andrews-median-frozen.trycloudflare.com/api/collections/comments/records"
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [nickName, setNickName] = useState("")
    const [error, setError] = useState(null)

    // Fetch comments from the API
    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error("Failed to fetch comments")
                }
                const data = await response.json()
                setComments(data.items)
            } catch (error) {
                console.error("Error fetching comments:", error)
                setError("Failed to fetch comments. Please try again later.")
            }
        }

        fetchComments()
    }, [])

    // Add a new comment
    async function handleAddComment(e) {
        e.preventDefault()
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comment: newComment, nickName })
            })

            if (!response.ok) {
                throw new Error("Failed to add comment, comments my only contain letters, numbers, commas and fullstops. Names may only contain letters")
            }

            const addedComment = await response.json()
            setComments((prevComments) => [...prevComments, addedComment])
            setNewComment("")
            setNickName("")
        } catch (error) {
            console.error("Error adding comment:", error)
            setError("Failed to add comment (the error can be caused by using anything else than: numbers, letters, fullstops and commas). Please try again later.")
        }
    }

    return (
        <div className="commentPage">
            {error && <p style={{ color: 'red' }}>{alert(error)}</p>}

            <div className="commentsContainer">
                <ul>
                    {comments.map(comment => (
                        <li key={comment.id}>
                            <strong>{comment.nickName}: </strong>
                            {comment.comment.split('\n').map((line, index) => (
                                <span key={index}>
                                    {line}
                                    {index < comment.comment.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                            <br />
                            <small>{new Date(comment.created).toLocaleString()}</small>
                        </li>
                    ))}
                </ul>
            </div>


            <form onSubmit={handleAddComment} className="commentForm">
                <input
                    className="nameInput"
                    type="text"
                    value={nickName}
                    onChange={(e) => setNickName(e.target.value)}
                    placeholder="Your Name"
                    required
                />
                <br />
                <textarea
                    className="commentInput"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    required
                    rows="4"
                />
                <br />
                <button type="submit" className="commentFormSubmitButton">Submit</button>
            </form>
        </div>
    )
}

export default Comments
