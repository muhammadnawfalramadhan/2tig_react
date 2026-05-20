import React from 'react';

export default function PageHeader({ title, breadcrumb, children }) {
    // Fungsi bantuan untuk me-render breadcrumb apakah berupa array atau string
    const renderBreadcrumb = () => {
        if (!breadcrumb) return null;

        if (Array.isArray(breadcrumb)) {
            return breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                    <span className="text-gray-500">{item}</span>
                    {/* Tambahkan separator '/' jika bukan elemen terakhir */}
                    {index < breadcrumb.length - 1 && (
                        <span className="text-gray-500">/</span>
                    )}
                </React.Fragment>
            ));
        }

        // Jika breadcrumb hanya berupa string tunggal
        return <span className="text-gray-500">{breadcrumb}</span>;
    };

    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold">
                    {title}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    {renderBreadcrumb()}
                </div>
            </div>
            
            {/* children akan me-render elemen apapun (seperti tombol) yang dimasukkan ke dalam komponen */}
            {children && (
                <div id="action-button">
                    {children}
                </div>
            )}
        </div>
    );
}