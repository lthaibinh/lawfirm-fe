
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-[1360px] flex mx-auto">{children}</div>;
}
