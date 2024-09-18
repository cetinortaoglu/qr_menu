"use client";
import { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import notFound from '../components/lotties/404.json';

export default function Custom404() {
  const containerRef = useRef(null); 

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: notFound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FCFFEC] text-black">
      <div ref={containerRef} style={{ maxWidth: '100%', maxHeight: '80vh' }}>
        <Lottie options={defaultOptions} />
      </div>
      <h1 className="text-4xl font-bold mt-8">404 - Sayfa Bulunamadı</h1>
      <p className="text-lg mt-4">Üzgünüm, aradığınız sayfayı bulamadım.</p>
      <p className="text-lg my-8 text-hm-Normal text-center">
          Lütfen qr menüye ulaşmak için{" "}
          <a href="#" className="text-blue-500">
            qr kodunuzu
          </a>{" "}
          tekrar okutunuz.
        </p>    </div>
  );
}
