import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import ClientTheme from "@/theme/ClientTheme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hotel Administrator",
  icons: "/icon.png",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <StyledComponentsRegistry>
          <ClientTheme>{children}</ClientTheme>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
