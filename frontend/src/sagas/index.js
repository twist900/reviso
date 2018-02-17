import projectSaga from './projectSaga';

export default sagaMiddleware => {
  sagaMiddleware.run(projectSaga);
};

