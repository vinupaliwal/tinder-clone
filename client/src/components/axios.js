import axios from 'axios';

const instance = axios.create({
    baseURL:"http://localhost:8081/",  
})

export default instance;

// https://tinder-clone-5107b.web.app - firebase
// https://tinder-clonegeeks.netlify.app/ - netlify
// https://tinder-clone-ten-ashen.vercel.app/ -- vercel bakcend