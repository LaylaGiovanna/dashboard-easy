//http://10.107.144.05
//http://10.107.144.05

// POST
export const sendData = async (path, method, body) => {
    const response = await fetch(`http://10.107.144.02:3000/${path}`, {
        method: method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
    const data = await response.json()
    return data
}

// GET
export const getData = async (path, token) => {
    const response = await fetch(`http://10.107.144.02:3000/${path}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json()
    console.log('resposta', data); // Use 'response' em vez de 'res'
        return data
}

export const deleteData = async (path, token) => {
    const response = await fetch(`http://10.107.144.02:3000/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    const data = await response.json()
    return data
}