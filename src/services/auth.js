import axios from 'axios'
const serverURL = 'http://20.206.129.202:3000'

export default async function isAuthenticated(){
    var result;
    const res = await axios.get(`${serverURL}/node/api/users/checkAuth`,{withCredentials: true})
        .then(response => {
            if(response.status===200){
                result= true;
            }else{
                result= false;

            }
        }).catch(e=>{
            result= false;
        });
    return result;

}


