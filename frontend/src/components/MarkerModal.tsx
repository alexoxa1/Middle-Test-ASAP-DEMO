import { useState, useEffect } from "react";
import Modal from "react-modal";

interface MarkerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
  onDelete?: () => void;
  type: "create" | "edit";
  initialComment?: string;
}

Modal.setAppElement("#root");

const MarkerModal = ({
  isOpen,
  onClose,
  onSubmit,
  onDelete,
  type,
  initialComment = "",
}: MarkerModalProps) => {
  const [comment, setComment] = useState(initialComment);

  useEffect(() => {
    setComment(initialComment);
  }, [initialComment]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  const handleDelete = () => {
    if (
      onDelete &&
      window.confirm("Are you sure you want to delete this marker?")
    ) {
      onDelete();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Marker Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 2000,
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          padding: "20px",
          zIndex: 2001,
        },
      }}
    >
      <h2>{type === "create" ? "Add New Marker" : "Edit Marker"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            style={{ width: "100%", minHeight: "100px", marginTop: "8px" }}
          />
        </div>
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button type="submit">
            {type === "create" ? "Create" : "Update"}
          </button>
          {type === "edit" && (
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          )}
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default MarkerModal;
