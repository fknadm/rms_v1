export const globalFetch = async () => {
    return fetch('https://us-central1-rms-deployment1.cloudfunctions.net/orders', {
        method: "GET"
    })
        .then(resp =>
            resp.json()
        )
}

export const singlePut = async (data) => {
    return fetch(`https://us-central1-rms-deployment1.cloudfunctions.net/ordersingle/${data.txid}`, {
        method: "GET",
    })
        .then(resp =>
            resp.json()
        )
        .then(res => {
            const updated = res.map(y => y.food.map(x => (x.tid === data.itemid ? { ...x, status: 'ready' } : { ...x })))
            console.log(updated, ' :CHECK IF MATCH CORRECT',res.map(x => x.id),'res')

            const id = res.map(x => {return x.id})

            const payload = {
                food:updated[0]
            }

            fetch(`https://us-central1-rms-deployment1.cloudfunctions.net/orders/${id}`, {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                  },
            })
            .then(resp => resp.json)
            .then(console.log('put success'))

        })


}