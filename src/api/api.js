// di file ../../api/api.js

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// [fetchWithRetry function remains the same]
const fetchWithRetry = async (
    fetcher,
    retries = 3,
    initialDelay = 1000
) => {
    // ... (kode fetchWithRetry tetap sama)
    for (let i = 0; i < retries; i++) {
        try {
            return await fetcher();
        } catch (error) {
            if (i === retries - 1) {
                throw error;
            }
            const delay = initialDelay * Math.pow(2, i);
            console.warn(`[API Retry] Attempt ${i + 1} failed (${error.message}). Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};


// ====================================================================
// FUNGSI GET (DILINDUNGI OLEH RETRY)
// ====================================================================

export const getAllArticles = async () => {
    const fetcher = async () => {
        const response = await fetch(`${baseUrl}/articles`);
        if (!response.ok) {
            try {
                const errorBody = await response.json();
                throw new Error(`Failed to fetch articles. Status: ${response.status}. Message: ${errorBody.message || 'Unknown server error.'}`);
            } catch (e) {
                throw new Error(`Failed to fetch articles. Status: ${response.status}.`);
            }
        }
        // Mengembalikan payload JSON penuh: { status: true, data: {...} }
        return response.json(); 
    };
    return fetchWithRetry(fetcher);
};

export const getAllTrainers = async () => {
    const fetcher = async () => {
        const response = await fetch(`${baseUrl}/trainers`);
        if (!response.ok) {
            try {
                const errorBody = await response.json();
                throw new Error(`Failed to fetch trainers. Status: ${response.status}. Message: ${errorBody.message || 'Unknown server error.'}`);
            } catch (e) {
                throw new Error(`Failed to fetch trainers. Status: ${response.status}.`);
            }
        }
        return response.json();
    };
    return fetchWithRetry(fetcher);
};

export const getALlGalleries = async () => {
    const fetcher = async () => {
        const response = await fetch(`${baseUrl}/galleries`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();

        // =======================================================
        // ✅ PERBAIKAN DAN LOGIKA DEBUGGING KHUSUS GALERI
        // =======================================================
        
        console.log("--- Gallery Debug Info ---");
        console.log("Full API Response:", result);
        console.log("Is result.data.galleries Array?", Array.isArray(result?.data?.galleries));
        console.log("Is result.data Array?", Array.isArray(result?.data));
        console.log("Is result Array?", Array.isArray(result));
        console.log("--------------------------");

        // Pengecekan utama: Struktur yang benar ({ data: { galleries: [...] } })
        if (result && result.data && Array.isArray(result.data.galleries)) {
            console.log("Successfully retrieved galleries array from result.data.galleries");
            // ✅ PERBAIKAN: Mengembalikan objek 'result' utuh, konsisten dengan API GET lainnya.
            return result; 
        }
        
        // Pengecekan Fallback (Jika struktur API berubah)
        if (result && Array.isArray(result.data)) {
            console.log("Successfully retrieved galleries array from result.data");
            return result; 
        }

        if (Array.isArray(result)) {
            console.log("Successfully retrieved galleries array from root object");
            return result;
        }

        console.warn("Gallery API format unrecognized. Returning response object.");
        return result; // Mengembalikan result meskipun format tidak dikenali.
    };
    
    return fetchWithRetry(fetcher);
};


// ====================================================================
// FUNGSI POST / PATCH / DELETE (TIDAK ADA RETRY)
// ====================================================================

export const LoginAdmin = async (email, password) => {
    const response = await fetch(`${baseUrl}/admin/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    // Ambil body JSON terlebih dahulu
    const result = await response.json();

    // 1. Cek status HTTP. Jika BUKAN 2xx (misalnya 401), lempar error.
    if (!response.ok) {
        // Melempar objek hasil response agar bisa diakses di blok catch frontend
        throw result; 
    }

    // 2. Jika status HTTP OK (2xx), kembalikan result
    return result;
};

export const addArticle = async (article) => {
    const response = await fetch(`${baseUrl}/articles/createArticle`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: article,
    });
    return response.json();
};

export const addTrainer = async (trainer) => {
    const response = await fetch(`${baseUrl}/trainers/createTrainer`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: trainer,
    });
    return response.json();
};

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
};

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
};

export const deleteArticle = async (id) => {
    const response = await fetch(`${baseUrl}/articles/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.json();
};

export const deleteTrainer = async (id) => {
    const response = await fetch(`${baseUrl}/trainers/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.json();
};

export const createGallery = async (gallery) => {
    const response = await fetch(`${baseUrl}/galleries/createGallery`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: gallery,
    });
    return response.json();
};

export const deleteGallery = async (id) => {
    const response = await fetch(`${baseUrl}/galleries/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.json();
};