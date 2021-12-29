import axios from "axios";
const serverURL = `http://${window.location.hostname}:${process.env.NODE_ENV??3000}`;

export default async function isAuthenticated() {
  var result;
  await axios
    .get(`${serverURL}/node/api/users/checkAuth`, { withCredentials: true })
    .then((response) => {
      if (response.status === 200) {
        result = true;
      } else {
        result = false;
      }
    })
    .catch((e) => {
      result = false;
    });
  return result;
}
