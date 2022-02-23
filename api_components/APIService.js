export default class APIService{
    // Insert an article
    static login(data){
        return fetch(`http://localhost:5000/add`,{
            'method':'POST',
             headers : {
            'Content-Type':'application/json'
      },
      body:JSON.stringify(
          {username: data.username, password: data.password}
      )
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

}