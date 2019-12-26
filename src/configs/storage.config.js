import Storage from '../modules/storage';


const Local = new  Storage(
    {
        defaultExpires: 1000 * 3600 * 24,      
    }
)
export default Local;