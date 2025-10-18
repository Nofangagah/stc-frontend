const baseUrl = import.meta.env.VITE_API_BASE_URL;





export const getAllArticles = async () => {
  const response = await fetch(`${baseUrl}/articles`);

  if (!response.ok) {
 
    const errorBody = await response.json();
    
    throw new Error(`Failed to fetch articles. Status: ${response.status}. Message: ${errorBody.message || 'Unknown server error.'}`);
  }

  return response.json();
}

export const getAllTrainers = async () => {
  const response = await fetch(`${baseUrl}/trainers`);

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`Failed to fetch trainers. Status: ${response.status}. Message: ${errorBody.message || 'Unknown server error.'}`);
  }

  return response.json();
}


export const LoginAdmin = async (email, password) => {
  const response = await fetch(`${baseUrl}/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export const addArticle = async (article) => {
  const response = await fetch(`${baseUrl}/articles/createArticle`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,

    },
    body: article,
  });
  return response.json();
}

export const addTrainer = async (trainer) => {
  const response = await fetch(`${baseUrl}/trainers/createTrainer`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,

    },
    body: trainer,
  });
  return response.json();
}



export const editTrainer = async (id, trainer) => {
  const response = await fetch(`${baseUrl}/trainers/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: trainer,
  });


  if (!response.ok) {

    try {
      const errorBody = await response.json();
      throw new Error(`Server Error (${response.status}): ${errorBody.message || 'Unknown server error.'}`);
    } catch (e) {

      throw new Error(`Request failed with status ${response.status}. URL: ${response.url}`);
    }
  }


  return response.json();
}

export const editArticle = async (id, article) => {
  const response = await fetch(`${baseUrl}/articles/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,

    },
    body: article,
  });

  if (!response.ok) {

    try {
      const errorBody = await response.json();
      throw new Error(`Server Error (${response.status}): ${errorBody.message || 'Unknown server error.'}`);
    } catch (e) {

      throw new Error(`Request failed with status ${response.status}. URL: ${response.url}`);
    }
  }
  return response.json();
}

export const deleteArticle = async (id) => {
  const response = await fetch(`${baseUrl}/articles/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
}

export const deleteTrainer = async (id) => {
  const response = await fetch(`${baseUrl}/trainers/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
}
