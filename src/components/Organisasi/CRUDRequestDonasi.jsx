import React, { useEffect, useState } from "react";
import {
  GetAllRequestDonasis,
  CreateRequestDonasis,
  UpdateRequestDonasi,
  DeleteRequestDonasis,
} from "../../api/apiRequestDonasi";

const initialForm = {
  desc_request: "",
};

const RequestDonasiCRUD = () => {
  const [reqDonasis, setReqDonasis] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchRequestDonasis = async () => {
    setLoading(true);
    try {
      const data = await GetAllRequestDonasis();
      setReqDonasis(data);
    } catch (err) {
      alert("Gagal mengambil data request donasi");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequestDonasis();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await UpdateRequestDonasi({ id_reqDonasi: editId, ...form });
        alert("Berhasil update request donasi");
      } else {
        await CreateRequestDonasis(form);
        alert("Berhasil tambah request donasi");
      }
      setForm(initialForm);
      setEditId(null);
      fetchRequestDonasis();
    } catch (err) {
      alert("Gagal menyimpan data");
    }
  };

  const handleEdit = (item) => {
    setForm({
      desc_request: item.desc_request,
    });
    setEditId(item.id_reqDonasi);
  };

  const handleDelete = async (id_reqDonasi) => {
    if (!window.confirm("Yakin ingin menghapus request donasi ini?")) return;
    try {
      await DeleteRequestDonasis(id_reqDonasi);
      fetchRequestDonasis();
    } catch (err) {
      alert("Gagal menghapus request donasi");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Data Request Donasi</h4>

      {/* Form input */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label>Deskripsi Permintaan:</label>
          <input
            type="text"
            name="desc_request"
            value={form.desc_request}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editId ? "Update" : "Tambah"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setEditId(null);
              setForm(initialForm);
            }}
          >
            Batal
          </button>
        )}
      </form>

      {/* Search input */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Cari deskripsi permintaan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabel data */}
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Deskripsi Permintaan</th>
              <th>Tanggal Permintaan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {reqDonasis.filter((item) =>
              item.desc_request.toLowerCase().includes(search.toLowerCase())
            ).length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  Tidak ada data ditemukan
                </td>
              </tr>
            ) : (
              reqDonasis
                .filter((item) =>
                  item.desc_request.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
                  <tr key={item.id_reqDonasi}>
                    <td>{item.id_reqDonasi}</td>
                    <td>{item.desc_request}</td>
                    <td>
                      {item.tgl_reqDonasi
                        ? new Date(item.tgl_reqDonasi).toLocaleDateString(
                            "id-ID",
                            {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            }
                          )
                        : "-"}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item.id_reqDonasi)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestDonasiCRUD;
