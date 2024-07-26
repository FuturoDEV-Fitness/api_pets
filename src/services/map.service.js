const axios = require('axios');
const linkMapApi = 'https://nominatim.openstreetmap.org/search?format=json&country=Brazil&limit=1'

async function getMapLocal(cep){
    try {
        const response = await axios.get(`${linkMapApi}&postalcode=${cep}`)

        if(!response.data || response.data.length === 0){
            throw new Error('CEP não encontrado');
        }

        const {lat, lon, display_name} = response.data[0]

        return {lat, lon, display_name}
    } catch (error) {
        return {erro: 'CEP não encontrado'}
    }
}

async function getGoogleMapsLink(coordenadas){
    try {
        const { lat, lon } = coordenadas;

        const googleMapsLink = `https://www.google.com/maps?q=${lat}, ${lon}`;

        return googleMapsLink;
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao gerar o link do Google Maps');
    }
}