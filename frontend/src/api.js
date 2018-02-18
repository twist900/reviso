import axios from 'axios';

export default {
  list: {
    fetchAll: listName => axios.get(`/${listName}`).then(res => res.data.data),
    create: (listName, item) =>
      axios
        .post(`/${listName}`, item)
        .catch(error => Promise.reject(error.response.data.error))
  },
  registrations: {
    toggle: id =>
      axios.get(`registrations/${id}/toggle`).then(res => res.data.data)
  }
};
