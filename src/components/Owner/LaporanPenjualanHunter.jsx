// src/components/laporan/LaporanStokGudang.jsx
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";
import { laporanPenjualanHunter } from "../../api/apiBarang";

export async function generateLaporanPenjualanHunter() {
  try {
    const data = await laporanPenjualanHunter();
    // console.log(data);
    // const data = response.data; // array kategori
    // const tahun = data.tahun;
    // const tanggalCetak = data.tanggalCetak;

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
    // doc.text(`Tanggal cetak: ${tanggalCetak}`, 14, 44);

    // doc.setFontSize(16);
    // doc.text("Laporan Penjualan Per Kategori", 10, 10);

    const penjualanColumns = [
      "Kategori",
      "Jumlah Item Terjual",
      "Jumlah Item Gagal Terjual",
    ];

    const rows = data.map((item) => [
      item.kategori,
      item.jumlah_terjual,
      item.jumlah_gagal,
    ]);

    // const rows = data.map((item) => [
    //   item.kategori,
    //   item.jumlah_terjual,
    //   item.jumlah_gagal,
    // ]);

    // rows.push(["Total", "....", "...."]);

    autoTable(doc, {
      startY: 40,
      head: [penjualanColumns],
      body: rows,
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

    doc.save("Laporan Penjualan Per Kategori Hunter.pdf");
  } catch (error) {
    console.error("Gagal generate penjualan per kategori hunter:", error);
    console.log("Token:", sessionStorage.getItem("token"));

    alert("Gagal mengambil data dari server");
  }
}
