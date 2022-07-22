import axios from 'axios';

const instance = axios.create({
    baseURL:"https://tinderclone-project2.herokuapp.com/",  
})

export default instance;

// https://tinder-clone-5107b.web.app - firebase
// https://tinder-clonegeeks.netlify.app/ - netlify