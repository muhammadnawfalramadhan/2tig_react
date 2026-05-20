// Pastikan komponen PageHeader sudah di-import
// import PageHeader from './PageHeader'; 

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-[80vh] flex-col items-center justify-center bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-md text-center">
          
          {/* Ikon Wajah Sedih / Bingung */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 shadow-sm">
            <svg 
              className="h-12 w-12 text-indigo-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            404
          </h1>
          
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            Ups! Anda Tersesat
          </h2>
          
          <p className="mt-4 text-base text-gray-500">
            Mungkin halaman yang Anda cari telah dihapus, namanya diubah, atau sementara tidak tersedia.
          </p>

          <div className="mt-10">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {/* Ikon Panah Kiri */}
              <svg 
                className="mr-2 h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                />
              </svg>
              Kembali ke Beranda
            </a>
          </div>
          
        </div>
      </main>
    </>
  );
}