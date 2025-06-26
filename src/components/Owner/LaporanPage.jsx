import React from "react";
import { generateLaporanStokGudang } from "../Owner/LaporanStokGudang";
import { generateLaporanPerKategori } from "../Owner/LaporanPerKategori";
import { generateLaporanBarangKadaluarsa } from "../Owner/LaporanBarangKadaluarsa";
import { generateLaporanPenjualanBulanan } from "../Owner/LaporanPenjualanBulanan";
import { generateLaporanKomisiPerProduk } from "../Owner/LaporanKomisiPerProduk";
import { generateLaporanPenjualanHunter } from "../Owner/LaporanPenjualanHunter";

const laporanList = [
  "Penjualan Bulanan Keseluruhan",
  "Laporan Komisi Bulanan per Produk",
  "Laporan Stok Gudang",
  "Laporan Penjualan per Kategori Barang",
  "Laporan Barang Masa Penitipan Habis",
  "Laporan Donasi Barang",
  "Laporan Request Donasi",
  "Laporan Transaksi Penitip",
  "Laporan Penjualan per Kategori Barang Hunter",
];

export default function LaporanPage() {
  const handleGenerate = async (laporan) => {
    switch (laporan) {
      case "Penjualan Bulanan Keseluruhan":
        await generateLaporanPenjualanBulanan();
        break;

      case "Laporan Komisi Bulanan per Produk":
        await generateLaporanKomisiPerProduk();
        break;

      case "Laporan Stok Gudang":
        await generateLaporanStokGudang();
        break;

      case "Laporan Penjualan per Kategori Barang":
        await generateLaporanPerKategori();
        break;

      case "Laporan Barang Masa Penitipan Habis":
        await generateLaporanBarangKadaluarsa();
        break;

      case "Laporan Penjualan per Kategori Barang Hunter":
        await generateLaporanPenjualanHunter();
        break;

      default:
        alert("Laporan belum tersedia");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ color: "#5a374b", marginBottom: 20 }}>
        Laporan dan Unduh PDF
      </h2>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {laporanList.map((laporan) => (
          <li key={laporan} style={{ marginBottom: 12 }}>
            <button
              onClick={() => handleGenerate(laporan)}
              style={{
                cursor: "pointer",
                padding: "10px 16px",
                backgroundColor: "#5a374b",
                color: "white",
                border: "none",
                borderRadius: 5,
                fontWeight: "600",
              }}
              type="button"
            >
              {laporan}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
