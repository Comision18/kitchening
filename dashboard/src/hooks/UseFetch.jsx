export const UseFetch = async (endpoint, method = 'GET', data, token = "") => {

    const apiURLBase = import.meta.env.VITE_API_URL_BASE

    const url = apiURLBase + endpoint // enpoint = "/courses"
    let response;

    try {
        if(method === 'GET'){
            response = await fetch(url)
        }
        
        if(method === 'POST' || method=== 'PATCH'){
         
            response = await fetch(url,{
                method : method,
                body : data,
                headers :{
                    Athorization : token
                }
            })
        }

        if(method === 'DELETE'){
            response = await fetch(url,{
                method,
                headers : {
                    Athorization : token
                }
            })
        }
    
        let result = await response.json();


        return result;
        
    } catch (error) {
        console.error;
    }



}

