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

    const getServicios = async (setServicios) => {
        var url = `${apiServerUrl}/servicios`
        const config = {
            method: 'GET',
            url: url,
            headers: {}, 
            data: {}
        }

        const data = await makeRequest({config})
        setServicios(data)
    }

    const upsertService = async (service) => {
        var url = `${apiServerUrl}/servicios`
        const config = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            }, 
            data: service
        }

        const data = await makeRequest({config})
        console.log("Response: ", data)
    }

    return {
        getServicios, 
        upsertService
    }
}