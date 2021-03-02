import axios from 'axios';

const Comment_API_BASE_URL = "http://localhost:8000/comment";

class CommentApiService {

    fetchComments() {
        return axios.get(Comment_API_BASE_URL);
    }
    fetchCommentByID(commentID) {
        return axios.get(Comment_API_BASE_URL + '/' + commentID);
    }
    fetchCommentsByBoardID(boardID) {
        return axios.get(Comment_API_BASE_URL + '/boardcomments/' + boardID);
    }
    editComment(comment) {
        return axios.put(Comment_API_BASE_URL + '/' + comment.comment_id, comment)
    }
    addComment(comment) {
        return axios.post(Comment_API_BASE_URL, comment);
    }
    deleteComment(commentID) {
        return axios.delete(Comment_API_BASE_URL + '/' + commentID);
    }
}

export default new CommentApiService();