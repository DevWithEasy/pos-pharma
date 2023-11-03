const api_url = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8080/api'

export default api_url