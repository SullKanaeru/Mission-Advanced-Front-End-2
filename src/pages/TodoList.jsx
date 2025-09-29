import { useNavigate } from "react-router";
import { useGet } from "../hooks/useGet";
import { useDelete } from "../hooks/useDelete";

const TodoList = () => {
  const navigate = useNavigate();
  const { getData, isLoading, isError, refetch } = useGet();
  const { deleteData, isMutating: isDeleting } = useDelete();

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) {
      try {
        await deleteData(id);
        refetch();
        console.log("Data berhasil dihapus");
      } catch (error) {
        console.log("Gagal menghapus data", error);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>

      {isLoading ? (
        <p>Loading....</p>
      ) : isError ? (
        <div>
          <p>Data gagal dimuat</p>
          <button onClick={() => window.location.reload()}>Coba Lagi</button>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>No</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Kegiatan
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Tanggal dimulai
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Tanggal berakhir
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Status
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {getData.map((item, index) => (
              <tr key={item.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.activity}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.start_date}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.due_date}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.status}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <button
                    onClick={() => navigate(`/edit/${item.id}`)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting}
                    style={{
                      backgroundColor: isDeleting ? "#ccc" : "#dc3545",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: isDeleting ? "not-allowed" : "pointer",
                    }}
                  >
                    {isDeleting ? "Menghapus..." : "Hapus"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <button onClick={() => navigate("/add")} style={{ marginTop: "20px" }}>
        Tambah kegiatan baru
      </button>
    </div>
  );
};

export default TodoList;
