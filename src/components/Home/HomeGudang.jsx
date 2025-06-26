import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, Table, Alert } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";

function HomeGudang() {
  const [transactions, setTransactions] = useState([]);
  const [titipanTransactions, setTitipanTransactions] = useState([
    {
      id: 1,
      customer: "Budi",
      barangTitipan: "Laptop",
      jadwal: "2023-06-27T10:00",
      status: "Belum Diterima",
    },
    {
      id: 2,
      customer: "Siti",
      barangTitipan: "Handphone",
      jadwal: "2023-06-27T14:00",
      status: "Sudah Diterima",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("pengiriman");
  const [formData, setFormData] = useState({
    id: "",
    customer: "",
    kurir: "",
    jadwal: "",
    barangTitipan: "",
  });
  const [alert, setAlert] = useState(null);
  const printComponentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
  });

  // Fetch transactions from backend when component mounts
  useEffect(() => {
    // Dummy fetch, no database required
    setTransactions([
      {
        id: 1,
        customer: "Ali",
        kurir: "John",
        jadwal: "2023-06-27T10:00",
        type: "Pengiriman",
        status: "Belum Diterima",
      },
      {
        id: 2,
        customer: "Dina",
        kurir: "Sarah",
        jadwal: "2023-06-27T12:00",
        type: "Pengiriman",
        status: "Sudah Diterima",
      },
    ]);
  }, []);

  const openModal = (type, item = null) => {
    setModalType(type);
    if (item) {
      // If we are editing, pre-fill the form with item data
      setFormData({
        id: item.id,
        customer: item.customer,
        kurir: item.kurir || "",
        jadwal: item.jadwal,
        barangTitipan: item.barangTitipan || "",
      });
    } else {
      // Clear the form for a new transaction
      setFormData({
        id: "",
        customer: "",
        kurir: "",
        jadwal: "",
        barangTitipan: "",
      });
    }
    setAlert(null);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (
      !formData.customer ||
      !formData.jadwal ||
      (modalType === "pengiriman" && !formData.kurir) ||
      (modalType === "titipan" && !formData.barangTitipan)
    ) {
      setAlert("Mohon isi semua data dengan lengkap.");
      return;
    }

    const newTransaction = {
      id: formData.id || titipanTransactions.length + 1, // Dummy ID auto-increment if new
      customer: formData.customer,
      kurir: modalType === "pengiriman" ? formData.kurir : null,
      barangTitipan: modalType === "titipan" ? formData.barangTitipan : null,
      jadwal: formData.jadwal,
      status: "Belum Diterima",
      type: modalType === "pengiriman" ? "Pengiriman" : "Titipan",
    };

    if (modalType === "titipan") {
      if (formData.id) {
        // If we are editing an existing transaction, update it
        setTitipanTransactions((prev) =>
          prev.map((tx) =>
            tx.id === formData.id ? { ...tx, ...newTransaction } : tx
          )
        );
      } else {
        // Otherwise, add a new transaction
        setTitipanTransactions([...titipanTransactions, newTransaction]);
      }
    } else {
      if (formData.id) {
        // Edit Pengiriman transaction
        setTransactions((prev) =>
          prev.map((tx) =>
            tx.id === formData.id ? { ...tx, ...newTransaction } : tx
          )
        );
      } else {
        // Add new Pengiriman transaction
        setTransactions([...transactions, newTransaction]);
      }
    }

    setShowModal(false);
    setAlert(null);
  };

  const confirmReceived = (id) => {
    setTitipanTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...tx, status: "Sudah Diterima" } : tx
      )
    );
    setAlert("Konfirmasi berhasil.");
  };

  // Function to search transactions (for Titipan)
  const handleSearchTitipan = (searchTerm) => {
    const filteredTitipan = titipanTransactions.filter((tx) =>
      tx.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTitipanTransactions(filteredTitipan);
  };

  return (
    <div className="container my-4">
      <h2>Dashboard Gudang</h2>

      {alert && (
        <Alert variant="info" onClose={() => setAlert(null)} dismissible>
          {alert}
        </Alert>
      )}

      <div className="mb-3">
        <Button
          variant="primary"
          className="me-2"
          onClick={() => openModal("pengiriman")}
        >
          Tambah Jadwal Pengiriman & Kurir
        </Button>
        <Button variant="secondary" onClick={() => openModal("pengambilan")}>
          Tambah Jadwal Pengambilan Sendiri
        </Button>
        <Button variant="warning" onClick={() => openModal("titipan")}>
          Tambah Transaksi Barang Titipan
        </Button>
      </div>

      <h3>Daftar Transaksi Barang Titipan</h3>
      <div className="mb-3">
        <input
          type="text"
          placeholder="Cari Transaksi Titipan"
          onChange={(e) => handleSearchTitipan(e.target.value)}
        />
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Barang Titipan</th>
            <th>Jadwal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {titipanTransactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.customer}</td>
              <td>{tx.barangTitipan}</td>
              <td>{tx.jadwal}</td>
              <td>{tx.status}</td>
              <td>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => {
                    alert(
                      `Cetak PDF Nota Titipan: ${
                        tx.nota || "Tidak tersedia"
                      } (simulasi)`
                    );
                  }}
                >
                  Cetak Nota
                </Button>
              </td>
              <td>
                {tx.status !== "Sudah Diterima" && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => confirmReceived(tx.id)}
                  >
                    Konfirmasi Diterima
                  </Button>
                )}
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => openModal("titipan", tx)}
                  className="ms-2"
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "pengiriman"
              ? "Tambah Jadwal Pengiriman & Kurir"
              : modalType === "titipan"
              ? formData.id
                ? "Edit Transaksi Barang Titipan"
                : "Tambah Transaksi Barang Titipan"
              : "Tambah Jadwal Pengambilan Sendiri"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formCustomer">
              <Form.Label>Nama Customer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan nama customer"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
              />
            </Form.Group>

            {modalType === "pengiriman" && (
              <Form.Group className="mb-3" controlId="formKurir">
                <Form.Label>Nama Kurir</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama kurir"
                  name="kurir"
                  value={formData.kurir}
                  onChange={handleChange}
                />
              </Form.Group>
            )}

            {modalType === "titipan" && (
              <Form.Group className="mb-3" controlId="formBarangTitipan">
                <Form.Label>Barang Titipan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Masukkan nama barang titipan"
                  name="barangTitipan"
                  value={formData.barangTitipan}
                  onChange={handleChange}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3" controlId="formJadwal">
              <Form.Label>Jadwal (Tanggal dan Waktu)</Form.Label>
              <Form.Control
                type="datetime-local"
                name="jadwal"
                value={formData.jadwal}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
          {alert && <Alert variant="danger">{alert}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{ display: "none" }}>
        <div ref={printComponentRef}>
          <h3>Nota Penjualan</h3>
          {/* Bisa dikembangkan isi nota sesuai kebutuhan */}
        </div>
      </div>
    </div>
  );
}

export default HomeGudang;
