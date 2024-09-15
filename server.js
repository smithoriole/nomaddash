const axios = require('axios');

async function testAxios() {
    try {
        const response = await axios.get('https://api.helius.xyz/v0/addresses/FQpAdBocBoxQpZh5P5S8fFuUbVDAAPgoqXvC3NJYReFL/balances?api-key=51a10f91-34a9-4ead-9c1f-3afe2a906208');
        console.log('Test Axios Response:', response.data);
    } catch (error) {
        console.error('Error with Axios test:', error.message);
    }
}

testAxios();
