export default {
  projects: {
    fetchAll: () =>
      fetch('/projects')
        .then(res => res.json())
        .then(json => json.data)
  }
};
