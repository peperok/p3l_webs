import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import HomeBefore from "../components/Home/HomeBefore";
import HomeAfter from "../components/Home/HomeAfter";
import LoginPage from "../pages/auth/LoginPage";
import RegisterOrganisasiPage from "../pages/auth/RegisterOrganisasi";
import RegisterPembeliPage from "../pages/auth/RegisterPembeli";
import HomeOrganisasi from "../components/Home/HomeOrganisasi";
import HomeAdmin from "../components/Home/HomeAdmin";
import HomeOwner from "../components/Home/HomeOwner";
import HomeGudang from "../components/Home/HomeGudang";
import HomeCS from "../components/Home/HomeCS";
import Nota from "../components/Home/Nota";
import ProfilPenitip from "../components/Profil/ProfilPenitip";
import Keranjang from "../components/Home/Keranjang";
import DataPenitip from "../components/Admin/DataPenitip";
import Komisi from "../components/Admin/Komisi";
import PaymentAndRating from "../components/Home/PaymentAndRating";
import DataPegawai from "../components/Admin/DataPegawai";
import LaporanPage from "../components/Owner/LaporanPage";
import PenitipCRUD from "../components/CS/CRUDPenitip";
import RequestDonasiCRUD from "../components/Organisasi/CRUDRequestDonasi";
import ProfilPembeli from "../components/Profil/ProfilPembeli";
import DataOrganisasi from "../components/Owner/DataOrgan";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>Routes Not Found!</div>,
  },
  {
    path: "/",
    element: <HomeBefore />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/registerPembeli",
    element: <RegisterPembeliPage />,
  },
  {
    path: "/registerOrganisasi",
    element: <RegisterOrganisasiPage />,
  },
  {
    path: "/homeAfter",
    element: <HomeAfter />,
  },
  {
    path: "/homeOrganisasi",
    element: <HomeOrganisasi />,
  },
  {
    path: "/homeGudang",
    element: <HomeGudang />,
  },
  {
    path: "/homeAdmin",
    element: <HomeAdmin />,
  },
  {
    path: "/homeOwner",
    element: <HomeOwner />,
  },
  {
    path: "/homeGudang",
    element: <HomeGudang />,
  },
  {
    path: "/homeCS",
    element: <HomeCS />,
    children: [
      {
        path: "penitip", // hasil akhir: /homeCS/penitip
        element: <PenitipCRUD />,
      },
      // tambahkan rute lain di sini sesuai kebutuhan
    ],
  },
  {
    path: "/homeOrganisasi",
    element: <HomeOrganisasi />,
    children: [
      {
        path: "requestDonasi", // hasil akhir: /homeCS/penitip
        element: <RequestDonasiCRUD />,
      },
      // tambahkan rute lain di sini sesuai kebutuhan
    ],
  },
  {
    path: "/profilPenitip",
    element: <ProfilPenitip />,
  },
  {
    path: "/profilPembeli",
    element: <ProfilPembeli />,
  },
  {
    path: "/keranjang",
    element: <Keranjang />,
  },
  {
    path: "/nota",
    element: <Nota />,
  },
  {
    path: "/paymentSuccess",
    element: <PaymentAndRating productId={1} />,
  },
  {
    path: "/dataOrganisasi",
    element: <DataOrganisasi />,
  },
  {
    path: "/admin/komisi",
    element: <Komisi />,
  },
  {
    path: "/home/keranjang",
    element: <Keranjang />,
  },
  {
    path: "/admin/datapegawai",
    element: <DataPegawai />,
  },
  {
    path: "/homeOwner/laporan",
    element: <LaporanPage />,
  },
  {
    path: "homeOwner/laporan/LaporanStokGudang",
    element: <generateLaporanStokGudang />,
  },
  {
    path: "homeOwner/laporan/LaporanPerKategori",
    element: <generateLaporanPerKategori />,
  },
  {
    path: "homeOwner/laporan/LaporanBarangKadaluarsa",
    element: <generateLaporanBarangKadaluarsa />,
  },
  {
    path: "homeOwner/laporan/LaporanPenjualanBulanan",
    element: <generateLaporanPenjualanBulanan />,
  },
  {
    path: "homeOwner/laporan/LaporanKomisiPerProduk",
    element: <generateLaporanKomisiPerProduk />,
  },
  {
    path: "homeOwner/laporan/LaporanPenjualanHunter",
    element: <generateLaporanPenjualanHunter />,
  },
]);

const AppRouter = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </>
  );
};

export default AppRouter;
