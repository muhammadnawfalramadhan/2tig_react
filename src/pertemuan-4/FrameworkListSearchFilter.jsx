import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = selectedTag ? framework.tags.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [...new Set(frameworkData.flatMap((f) => f.tags))];

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      {/* Header / Hero Section */}
      <div className="bg-white border-b border-gray-200 pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Framework <span className="text-indigo-600">Explorer</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Temukan framework terbaik untuk pengembangan modern tanpa ribet.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8">
        {/* Search & Filter Bar */}
        <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:row items-center gap-3 mb-12 flex-md-row">
          <div className="relative w-full flex-1">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari framework..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </div>
            <select
              className="w-full pl-12 pr-10 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer text-gray-600"
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
          {filteredFrameworks.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-colors duration-300">
                    <svg className="w-6 h-6 text-indigo-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    {item.details.releaseYear}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                  {item.name}
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags?.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-md uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Developer</p>
                  <p className="text-sm font-semibold text-slate-700">{item.details.developer}</p>
                </div>
                <a
                  href={item.details.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 text-white hover:bg-indigo-600 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredFrameworks.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400">Data tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}