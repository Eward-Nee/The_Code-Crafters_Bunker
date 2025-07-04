import { useEffect, useState } from "react"
import "./Comments.css"

// Function to generate a random string of specified length
function generateRandomKey(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}

function Comments() {
    // const apiUrlED = "https://.trycloudflare.com/api/collections/comments/records"
    // const apiUrl = "https://.trycloudflare.com/api/collections/posts/records"
    const apiUrlED = "https://mypocketbase.loca.lt/api/collections/comments/records"
    const apiUrl = "https://mypocketbase.loca.lt/api/collections/posts/records"
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [nickName, setNickName] = useState("")
    const [error, setError] = useState(null)
    const [newlyAddedComments, setNewlyAddedComments] = useState([]) // Track newly added comments

    // Fetch comments from the API
    useEffect(() => {
        async function fetchComments() {
            try {
                const response = await fetch(apiUrl)
                if (!response.ok) {
                    throw new Error("Failed to fetch comments")
                }
                const data = await response.json()
                setComments(data.items) // `deKey` will not be included in `data.items`
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
        setError(null) // Reset error state before submission

        try {
            const generatedDeKey = generateRandomKey(30) // Generate a random deKey
            const requestBody = { comment: newComment, nickName, deKey: generatedDeKey }

            console.log("Request Body:", requestBody) // Log the request body

            const response = await fetch(apiUrlED, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            })

            const responseData = await response.json() // Get the response data
            console.log("Response Data:", responseData) // Log the response data

            if (!response.ok) {
                throw new Error("Failed to add comment. Comments may only contain letters, numbers, commas, and full stops. Names may only contain letters.")
            }

            setComments((prevComments) => [...prevComments, responseData])
            setNewlyAddedComments((prevNewComments) => [...prevNewComments, { ...responseData, deKey: generatedDeKey }]) // Track newly added comment with deKey
            setNewComment("")
            setNickName("")
        } catch (error) {
            console.error("Error adding comment:", error)
            setError("Failed to add comment. Please ensure your input is valid.")
            setNewComment("") // Clear the comment input on error
            setNickName("") // Clear the nickname input on error
        }
    }


    // Function to find the id based on deKey
    function findIdByDeKey(deKey) {
        const comment = comments.find(comment => comment.deKey === deKey);
        return comment ? comment.id : null
    }

    // Delete a comment by deKey
    async function handleDeleteComment(deKey) {
        const idToDelete = findIdByDeKey(deKey)
        console.log(deKey)

        if (!idToDelete) {
            console.error("No comment found with the provided deKey:", deKey)
            setError("Comment not found. Please try again.")
            return;
        }

        try {
            const response = await fetch(`${apiUrlED}/${idToDelete}`, {
                method: "DELETE"
            })

            if (!response.ok) {
                const errorData = await response.json() // Get error details if available
                console.error("Delete error response:", errorData)
                throw new Error("Failed to delete comment.")
            }

            // Update the comments state to remove the deleted comment
            setComments((prevComments) => prevComments.filter(comment => comment.id !== idToDelete))
            setNewlyAddedComments((prevNewComments) => prevNewComments.filter(comment => comment.id !== idToDelete))
        } catch (error) {
            console.error("Error deleting comment:", error)
            setError("Failed to delete comment. Please try again later.")
        }
    }

    return (
        <div className="commentPage">
            {error && <p style={{ color: 'red' }}>{error}</p>}

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
                            <br />
                            {newlyAddedComments.some(newComment => newComment.id === comment.id) && (
                                <button onClick={() => handleDeleteComment(comment.deKey)} className="deleteButton">
                                    Delete
                                </button>
                            )}
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
