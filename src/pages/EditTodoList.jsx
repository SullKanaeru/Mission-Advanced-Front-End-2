import { useNavigate, useParams } from "react-router";
import { useEffect, useRef } from "react";
import { useUpdate } from "../hooks/useUpdate";
import useTodoList from "../store/useTodolist";

const EditTodoList = ({ isEdit }) => {
  const navigate = useNavigate();
  const formRef = useRef();
  const { id } = useParams();
  const { putData } = useUpdate();
  const { list } = useTodoList((state) => state);

  // Status options for the dropdown
  const optionStatus = [
    { label: "Belum", value: "belum" },
    { label: "Proses", value: "proses" },
    { label: "Selesai", value: "selesai" },
  ];

  // Pre-fill form fields with existing data
  useEffect(() => {
    if (list[id] && formRef.current) {
      formRef.current.activity.value = list[id].activity || "";
      formRef.current.startdate.value = list[id].start_date || "";
      formRef.current.duedate.value = list[id].due_date || "";
      formRef.current.status.value = list[id].status || "belum";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API service to update a specific todo item
      await putData(id, {
        activity: formRef.current.activity.value,
        start_date: formRef.current.startdate.value,
        due_date: formRef.current.duedate.value,
        status: formRef.current.status.value,
      });

      navigate(-1);
      console.log("BERHASIL POST DATA");
    } catch (e) {
      console.log("GAGAL POST DATA");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "8px 16px",
          marginBottom: "20px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Kembali
      </button>

      <h1 style={{ color: "#333", marginBottom: "30px" }}>Edit Kegiatan</h1>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f8f9fa",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Aktivitas:
          </label>
          <input
            name="activity"
            type="text"
            placeholder="Masukkan aktivitas"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Tanggal Mulai:
          </label>
          <input
            name="startdate"
            type="date"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Tanggal Berakhir:
          </label>
          <input
            name="duedate"
            type="date"
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Status:
          </label>
          <select
            name="status"
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px",
              boxSizing: "border-box",
              backgroundColor: "white",
            }}
          >
            {optionStatus.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Simpan pembaruan
        </button>
      </form>
    </div>
  );
};

export default EditTodoList;
