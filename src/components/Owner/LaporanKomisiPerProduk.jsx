// src/components/laporan/LaporanStokGudang.jsx
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { laporanPerKategori, laporanStokGudang } from "../../api/apiBarang";

export async function generateLaporanKomisiPerProduk() {
  try {
    const data = await laporanPerKategori();
    // console.log(data);
    // const data = response.data; // array kategori
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
    doc.text("LAPORAN KOMISI PER PRODUK", 105, 30, {
      align: "center",
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    // doc.doc.text(`Bulan : "Januari"`);
    // doc.text(`Tahun : ${tahun}`, 14, 38);
    doc.text(`Tanggal cetak: ${tanggalCetak}`, 14, 44);

    // doc.setFontSize(16);
    // doc.text("Laporan Penjualan Per Kategori", 10, 10);

    const komisiColumns = [
      "Kode Produk",
      "Nama Produk",
      "Harga Jual",
      "Tanggal Masuk",
      "Komisi Hunter",
      "Komisi ReUse Mart",
      "Bonus Penitip",
    ];

    const penjualanRows = [
      [
        "T011",
        "TV LED 40 Inch",
        "Rp 1.800.000",
        "2025-05-10",
        "Rp 90.000",
        "Rp 360.000",
        "Rp 1.350.000",
      ],
      [
        "K12",
        "Kaos Polos Distro",
        "Rp 85.000",
        "2025-06-02",
        "4.250",
        "Rp 17.000",
        "Rp 63.750",
      ],
      [
        "P14",
        "Paket Buku Pelajaran SMP",
        "Rp 200.000",
        "2025-07-10",
        "Rp 10.000",
        "Rp 40.000",
        "Rp 150.000",
      ],
      [
        "M15",
        "Mainan Edukasi Balok Kayu",
        "Rp 150.000",
        "2025-07-11",
        "Rp 7.500",
        "Rp 30.000",
        "Rp 112.500",
      ],
    ];

    // const rows = data.map((item) => [
    //   item.kategori,
    //   item.jumlah_terjual,
    //   item.jumlah_gagal,
    // ]);

    // rows.push(["Total", "....", "...."]);

    autoTable(doc, {
      startY: 40,
      head: [komisiColumns],
      body: penjualanRows,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 5,
        halign: "center",
        valign: "middle",
      },
      headStyles: {
        fillColor: [67, 67, 67],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save("Laporan Komisi Per Produk.pdf");
  } catch (error) {
    console.error("Gagal generate komisi per produk:", error);
    console.log("Token:", sessionStorage.getItem("token"));

    alert("Gagal mengambil data dari server");
  }
}
