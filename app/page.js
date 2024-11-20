export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md  text-center">
        <h1 className="text-3xl font-semibold mb-4 text-hm-darker">
          Hoş Geldiniz!
        </h1>
        <p className="text-lg my-8 text-hm-Normal">
          Lütfen qr menüye ulaşmak için{" "}
          <a href="#" className="text-blue-500">
            qr kodunuzu
          </a>{" "}
          tekrar okutunuz.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Powered by<span className="font-semibold"> Begüm Yazılım</span>
          <span className="">&copy; 2024</span>
          <br />
          <span className="mt-4">❤️</span>
        </p>
      </div>
    </div>
  );
}
