import axios from "axios";
const instance = axios.create({
    baseURL:"https://opentdb.com/",
});
export default instance ;