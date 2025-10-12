import { useState } from 'react';

const useCartDeleteModal = (deleteItemLogic) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);

  const handleRemoveClick = (itemId) => {
    setItemToDeleteId(itemId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDeleteId) {
      await deleteItemLogic(itemToDeleteId);
    }
    setIsModalOpen(false);
    setItemToDeleteId(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setItemToDeleteId(null);
  };

  return {
    isModalOpen,
    handleRemoveClick,
    handleConfirmDelete,
    handleCancelDelete,
  };
};

export default useCartDeleteModal;