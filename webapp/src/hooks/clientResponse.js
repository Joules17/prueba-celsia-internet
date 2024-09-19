import axios from 'axios';

export const useExternalApi = () => {
    const apiServerUrl = 'http://localhost:8080';

    const makeRequest = async (options) => {
        try {
            const response = await axios(options.config)
            const {data} = response

            return data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return error.response.data
            }

            return error.message
        }
    }

    const getClientes = async (setClientes) => {
        var url = `${apiServerUrl}/clientes`
        const config = {
            method: 'GET',
            url: url,
            headers: {}, 
            data: {}
        }

        const data = await makeRequest({config})
        setClientes(data)
    }

    const upsertClient = async (client) => {
        var url = `${apiServerUrl}/clientes`
        const config = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: client
        }

        const data = await makeRequest({config})
        console.log("Response: ", data)
    }

    const deleteClient = async (client) => {
        var url = `${apiServerUrl}/clientes/${client.id}`
        const config = {
            method: 'DELETE',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: {}
        }

        const data = await makeRequest({config})
        console.log("Response: ", data)
    }

    return {
        getClientes, 
        upsertClient,
        deleteClient
    }
}