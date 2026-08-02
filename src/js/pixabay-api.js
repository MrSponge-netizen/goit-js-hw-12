import axios from 'axios';
export default async function getImagesByQuery(query, page_number = 1) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '56852680-f175d4910a2a6d37927d6bf40',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page_number,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Failed to request:', error);
    throw error;
  }
}

