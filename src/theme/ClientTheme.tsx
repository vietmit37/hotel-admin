"use client";

import React, { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
import ClientLayout from "@/layouts/ClientLayout";
import { usePathname } from "next/navigation";
import { THEME_LOCALSTORAGE } from "@/utils/consts/theme.const";
import { ETheme } from "@/utils/enums/theme.enum";

const ClientTheme: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState<ETheme>(ETheme.light);

  const isAuthLayout = usePathname().includes("auth");

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_LOCALSTORAGE);

    if (savedTheme) {
      setSelectedTheme(savedTheme as ETheme);
    }
  }, []);

  const handleThemeChange = (selectedTheme: ETheme) => {
    setSelectedTheme(selectedTheme);
    localStorage.setItem(THEME_LOCALSTORAGE, selectedTheme);
  };

  return (
    <ConfigProvider
      theme={
        selectedTheme === ETheme.light
          ? {
              token: {
                colorPrimary: "#00d274",
                colorBgContainer: "#ffffff",
                colorBgBase: "#f6f6f6",
                colorTextBase: "#000000",
                colorBorder: "#42424250",
                borderRadius: 5,
              },
              components: {
                Button: {
                  colorBorder: "#00d274",
                  colorPrimaryHover: "#ffffff",
                  colorPrimaryActive: "#ffffff",
                  colorLink: "#00d274",
                  colorLinkHover: "#007e45",
                },
                Table: {
                  colorBgContainer: "#ffffff",
                  rowHoverBg: "rgb(224,253,243)",
                  rowSelectedBg: "rgb(216,251,239,1)",
                  rowSelectedHoverBg: "#00d27427",
                },
                Modal: {
                  contentBg: "#f6f6f6",
                },
              },
            }
          : {
              token: {
                colorPrimary: "#00d274",
                colorPrimaryBg: "#00d27415",
                colorBgContainer: "#2f2f2f",
                colorBgBase: "#191919",
                colorTextBase: "#ffffff",
                colorBorder: "#000000bb",
                borderRadius: 5,
              },
              components: {
                Button: {
                  colorBorder: "#00d274",
                  colorPrimaryHover: "#000000",
                  colorPrimaryActive: "#000000",
                  colorLink: "#00d274",
                  colorLinkHover: "#007e45",
                },
                Table: {
                  colorBgContainer: "rgb(33,33,33)",
                  rowHoverBg: "#00d27414",
                  rowSelectedBg: "#00d27414",
                  rowSelectedHoverBg: "#00d27427",
                },
                Modal: {
                  contentBg: "#191919",
                },
              },
            }
      }
    >
      {isAuthLayout ? (
        children
      ) : (
        <ClientLayout
          savedTheme={selectedTheme}
          onThemeChange={handleThemeChange}
        >
          {children}
        </ClientLayout>
      )}
    </ConfigProvider>
  );
};

export default ClientTheme;
