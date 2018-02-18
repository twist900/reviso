import axios from 'axios';

export default {
  projects: {
    fetchAll: () => axios.get('/projects').then(res => res.data.data),
    create: project =>
      axios
        .post('/projects', project)
        .catch(error => Promise.reject(error.response.data.error))
  }
};
