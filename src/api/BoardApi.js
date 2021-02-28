import axios from 'axios';

const Board_API_BASE_URL = "http://localhost:8000/board";

class BoardApiService {

    fetchBoards() {
        return axios.get(Board_API_BASE_URL);
    }
    fetchBoardsLiked() {
        return axios.get(Board_API_BASE_URL+'/likedorder');
    }
    fetchBoardsSave(){
        return axios.get(Board_API_BASE_URL+'/save');
    }

    fetchBoardByID(boardID) {
        return axios.get(Board_API_BASE_URL + '/' + boardID);
    }

    editBoard(board) {
        return axios.put(Board_API_BASE_URL + '/' + board.board_id, board)
    }
    addBoard(board) {
        return axios.post(Board_API_BASE_URL, board);
    }
        
    fetchLikeUserBoardCheck(UserLikeBoard) {
        return axios.get(Board_API_BASE_URL + '/like'+"/"+UserLikeBoard.board_id+"/"+UserLikeBoard.userid);
    }

    addLikedUserBoard(UserLikeBoard){
        return axios.post(Board_API_BASE_URL + "/like", UserLikeBoard);
    }
    deleteLikedUserBoard(UserLikeBoard) {
        // return axios.delete(Board_API_BASE_URL + '/like'+"/?board_id="+UserLikeBoard.board_id+"&userid="+UserLikeBoard.userid);
        return axios.delete(Board_API_BASE_URL + '/like'+"/"+UserLikeBoard.board_id+"/"+UserLikeBoard.userid);
        // return axios.delete(Board_API_BASE_URL + '/like');
    }

    fetchSavedUserBoardCheck(userid) {
        return axios.get(Board_API_BASE_URL + '/savedboardCheck'+"/"+userid);
    }
    addSaveddUserBoard(UserSavedBoard){
        return axios.post(Board_API_BASE_URL + "/saved", UserSavedBoard);
    }
    fetchSavedUserBoard(userid) {
        return axios.get(Board_API_BASE_URL + '/savedboard'+"/"+userid);
    }
    fetchSavedUserBoardLiked(userid) {
        return axios.get(Board_API_BASE_URL + '/savedboardLiked'+"/"+userid);
    }

    // addUserLikeBoard(user) {
    //     return axios.post(Board_API_BASE_URL, user);
    // }
    
    // deleteUser(userID) {
    //     return axios.delete(Board_API_BASE_URL + '/' + userID);
    // }


    // editUser(user) {
    //     return axios.put(Board_API_BASE_URL + '/' + user.id, user)
    // }
 
}

export default new BoardApiService();