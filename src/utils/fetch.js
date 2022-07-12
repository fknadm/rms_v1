export const globalFetch = async () => {
let resData = await
         fetch('https://us-central1-rms-deployment1.cloudfunctions.net/orders',{
        method:"GET"
    })
        .then(resp => 
            resp.json()
        )
        .then( async (result) => {return result})


        return resData

    
}

export const singlePut = async (data) => {
    let resData = await
             fetch('https://us-central1-rms-deployment1.cloudfunctions.net/orders',{
            method:"PUT",
            body:''
        })
            .then(resp => 
                resp.json()
            )
            .then( async (result) => {return result})
    
    
            return resData
    
        
    }