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

            if (data.status === 'ready' && data.type === 'food') {
                var updated = res.map(y => y.food.map(x => (x.tid === data.itemid ? { ...x, status: 'ready' } : { ...x })))
                var upOp = res.map(y => y.drink.map(x => ({...x})))
            }

            else if ( data.status === 'ready' && data.type === 'drink') {
                var updated = res.map(y => y.drink.map(x => (x.tid === data.itemid ? { ...x, status: 'ready' } : { ...x })))
                var upOp = res.map(y => y.food.map(x => ({...x})))

            }

            if (data.status === 'sent' && data.type === 'food') {
                var updated = res.map(y => y.food.map(x => (x.tid === data.itemid ? { ...x, status: 'sent' } : { ...x })))
                var upOp = res.map(y => y.drink.map(x => ({...x})))
            }

            else if ( data.status === 'sent' && data.type === 'drink') {
                var updated = res.map(y => y.drink.map(x => (x.tid === data.itemid ? { ...x, status: 'sent' } : { ...x })))
                var upOp = res.map(y => y.food.map(x => ({...x})))

            }

            const checkNew = updated[0].every(el => el.status === 'ready')
            const checkExist = upOp[0].every(el => el.status === 'ready')

            const checkNew3 = updated[0].every(el => el.status === 'ready' || el.status === 'sent')
            const checkExist3 = upOp[0].every(el => el.status === 'sent' || el.status === 'ready')

            const checkNew2 = updated[0].every(el => el.status === 'sent')
            const checkExist2 = upOp[0].every(el => el.status === 'sent')

            // console.log(updated, ' :CHECK IF MATCH CORRECT',res.map(x => x.id),'res')
            console.log(checkNew,checkExist,checkNew2,checkExist2,'FINAL CHECK')

            if (checkNew && checkExist) {
                var curStat = 'ready'
                console.log('ready')
            }

            else if (checkNew2 && checkExist2) {
                var curStat = 'complete'
                console.log('complete')

            }

            else if (checkNew3 && checkExist3) {
                var curStat = 'ready'
                console.log('ready')
            }
            else {
                var stat = res.map(x => {return x.status})
                var curStat= stat[0]
                console.log('def')

            }
            
            
            console.log(curStat,'curstat')
            const id = res.map(x => {return x.id})

            if (data.type === 'food') {
            var payload = {
                food:updated[0],
                status:curStat
            }
            }
            if (data.type === 'drink') {
                var payload = {
                    drink:updated[0],
                    status:curStat
                }
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

export const remOrder = async (data) => {
    return fetch(`https://us-central1-rms-deployment1.cloudfunctions.net/ordersingle/${data.txid}`, {
        method: "GET",
    })
        .then(resp =>
            resp.json()
        )
        .then(res => {
            const id = res.map(x => {return x.id})

            fetch(`https://us-central1-rms-deployment1.cloudfunctions.net/orders/${id}`, {
                method: "DELETE",
            })
            .then(resp => resp.json)
            .then(console.log('rem success'))

        })


}