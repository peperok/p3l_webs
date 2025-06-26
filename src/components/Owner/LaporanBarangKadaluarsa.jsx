// src/components/laporan/LaporanStokGudang.jsx
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { laporanBarangKadaluarsa } from "../../api/apiPenitipan";

export async function generateLaporanBarangKadaluarsa() {
  try {
    const data = await laporanBarangKadaluarsa();
    // console.log("API response:", data);
    const tahun = data.tahun;
    const tanggalCetak = data.tanggalCetak;

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("ReUse Mart", 14, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Jl. Green Eco Park No. 456 Yogyakarta", 14, 20);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("LAPORAN PENJUALAN YANG MASA PENITIPANNYA SUDAH HABIS", 105, 30, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Tahun : ${tahun}`, 14, 38);
    doc.text(`Tanggal cetak: ${tanggalCetak}`, 14, 44);

    // doc.setFontSize(16);
    // doc.text("Laporan Penjualan Per Kategori", 10, 10);

    const columns = [
      "Kode Produk",
      "Nama Produk",
      "Id Penitip",
      "Nama Penitip",
      "Tanggal Masuk",
      "Tanggal Akhir",
      "Batas Ambil",
    ];

    const rows = data.map((item) => [
      item.id_barang,
      item.nama_barang,
      item.id_penitip,
      item.nama_penitip,
      item.tgl_penitipan,
      item.tgl_kadaluarsa,
      item.tgl_pengembalian,
    ]);

    autoTable(doc, {
      startY: 52,
      head: [columns],
      body: rows,
      theme: "grid",
      styles: {
        fontSize: 10,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [230, 230, 230],
        textColor: [0, 0, 0],
        fontStyle: "bold",
      },
      columnStyles: {
        0: { halign: "left" },
      },
    });

    doc.save("Laporan Barang Masa Penitipan Habis.pdf");
  } catch (error) {
    console.error("Gagal generate laporan stok gudang:", error);
    console.log("Token:", sessionStorage.getItem("token"));

    alert("Gagal mengambil data dari server");
  }
}
