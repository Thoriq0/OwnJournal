import "./globals.css";

export default function DashboardLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <title>Own Journal</title>
      </head>
      <body className="bg-[#273F4F]">
        <main>{children}</main>
      </body>
    </html>
  )
}