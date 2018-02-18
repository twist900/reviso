import React from 'react';
import { Modal } from 'semantic-ui-react';

const FormModal = ({ open, onClose, header, children }) => (
  <Modal onClose={onClose} open={open}>
    <Modal.Header>{header}</Modal.Header>
    <Modal.Content>{children}</Modal.Content>
  </Modal>
);

export default FormModal;
