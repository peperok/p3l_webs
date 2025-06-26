import React, { useEffect, useState } from "react";
import {
  GetAllPenitips,
  CreatePenitip,
  UpdatePenitip,
  DeletePenitip,
} from "../../api/apiPenitip";

const initialForm = {
  nama_penitip: "",
  NIK: "",
  email: "",
  password: "",
};

const PenitipCRUD = () => {
  const [penitips, setPenitips] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchPenitips = async () => {
    setLoading(true);
    try {
      const data = await GetAllPenitips();
      setPenitips(data);
    } catch (err) {
      alert("Gagal mengambil data penitip");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPenitips();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await UpdatePenitip({ id_penitip: editId, ...form });
        alert("Berhasil update penitip");
      } else {
        await CreatePenitip(form);
        alert("Berhasil tambah penitip");
      }
      setForm(initialForm);
      setEditId(null);
      fetchPenitips();
    } catch (err) {
      alert("Gagal menyimpan data");
    }
  };

  const handleEdit = (penitip) => {
    //console.log("Edit data:", penitip);
    setForm({
      id_penitip: penitip.id_penitip,
      nama_penitip: penitip.nama_penitip,
      NIK: penitip.NIK,
      email: penitip.email,
      password: "", // kosongkan untuk alasan keamanan
    });
    setEditId(penitip.id_penitip);
  };

  const handleDelete = async (id_penitip) => {
    if (!window.confirm("Yakin ingin menghapus penitip ini?")) return;
    try {
      await DeletePenitip(id_penitip);
      fetchPenitips();
    } catch (err) {
      alert("Gagal menghapus penitip");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Data Penitip</h4>

      {/* Form input */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label>Nama:</label>
          <input
            type="text"
            name="nama_penitip"
            value={form.nama_penitip}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-2">
          <label>NIK:</label>
          <input
            type="text"
            name="NIK"
            value={form.NIK}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-2">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-2">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            required={!editId}
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
        placeholder="Cari nama penitip..."
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
              <th>Nama</th>
              <th>NIK</th>
              <th>Email</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {penitips.filter((p) =>
              p.nama_penitip.toLowerCase().includes(search.toLowerCase())
            ).length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  Tidak ada data ditemukan
                </td>
              </tr>
            ) : (
              penitips
                .filter((p) =>
                  p.nama_penitip.toLowerCase().includes(search.toLowerCase())
                )
                .map((p) => (
                  <tr key={p.id_penitip}>
                    <td>{p.nama_penitip}</td>
                    <td>{p.NIK}</td>
                    <td>{p.email}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p.id_penitip)}
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

export default PenitipCRUD;
