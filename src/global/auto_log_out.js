import decrypt from "../utils/Functions/decrypt";
var auto_log_out=(role)=>{
    try{
        var flag = decrypt(localStorage.getItem("flag"));
        if (flag == "Y" && decrypt(localStorage.getItem("role")) == role) {
          //this function will automatically logout the user to sign-in page after 20 minutes expiry set on login page  
          var session_expired_time = decrypt(
            localStorage.getItem("session_expired_time")
          );
          var current_date = new Date();
          if (current_date.getTime() > new Date(session_expired_time).getTime()) {
            window.location.replace("/sign-in");
          }
        } else {
          window.location.replace("/sign-in");
        }
      }catch(Exception){ window.location.replace("/sign-in");}
}
export default auto_log_out;