import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo, } from "react";
import { FaHamburger } from 'react-icons/fa';

import {
  ArticleIcon,
  CollapsIcon,
  HomeIcon,
  LogoIcon,
  LogoutIcon,
  UsersIcon,
  VideosIcon,
  // HamburguerIcon,
} from "./icons";

import {
  IconHome2,
  IconCoffee,
  IconUser,
  IconFileDescription,
  IconQrcode,
  IconShoppingCartExclamation
} from '@tabler/icons-react';
import { useLogout } from './logout';
// import LogoutPopup from "./LogoutPopUp";



// essas são as rotas a partir dos icons de menu
const menuItems = [
  { id: 1, label: "Home", icon: (() => <IconHome2 color='#e5e5e5' width={26} height={26} />), link: "/dashboard" },
  { id: 2, label: "Produtos", icon: (() => <IconCoffee color='#e5e5e5' width={26} height={26} />), link: "/produtos" },
  { id: 3, label: "Colaborador", icon: (() => <IconUser color='#e5e5e5' width={26} height={26} />), link: "/colaborador" },
  { id: 4, label: "Pedidos", icon: (() => <IconFileDescription color='#e5e5e5' width={26} height={26} />), link: "/pedidos" },
  { id: 5, label: "Verificar QrCode", icon: (() => <IconQrcode color='#e5e5e5' width={26} height={26} />), link: "/qrCode" },
  // { id: 6, label: "mudar", icon: (() => <IconQrcode color='#e5e5e5' width={26} height={26} />), link: "/mudar" },
  { id: 10, label: "Historico de Pedidos", icon: (() => <IconShoppingCartExclamation color='#e5e5e5' width={26} height={26} />), link: "/historicoDePedidos" },

];

const Sidebar = () => {
  //[ estado inicial, estado final ] 
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);
  const [logoutComponent, setLogoutComponent] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const router = useRouter();

  const handleLogout = useLogout();
  

  
  
  

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  // serve para definir o tamanho da sidebar, w-80 é a largura inicial
  // e w-20 a largura quando clicado
  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 bg-primary flex justify-between flex-col ",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  // serve para rotacionar o icon da abertura e fechamento da sidebar
  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      " flex items-center cursor-pointer hover:bg-lightOrange rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-lightOrange"]: activeMenu.id === menu.id,
      }
    );
  };

  // serve para mostrar o icone apenas quando o mouse passar em cima da sidebar
  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  // serve para abrir e fechar a aba lateral
  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const sair = () => {

    console.log('sair')
  }
  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col ">
        <div className="flex  flex-col items-center justify-between relative ">
          
          {/* essas linhas do button servem para dizer 
            que pode ser fechado e aberto novamente */}
          <div className="flex h-16 justify-center items-center">
            {isCollapsible && (
              <button
                className={collapseIconClasses}
                onClick={handleSidebarToggle}
              >
                <CollapsIcon />
              </button>

            )}
          </div>
          <div className="flex  items-center justify-center" >
            {/* LogoIcon é o icone criado para uso no video */}
            {/* esse bloco de código serve para esconder o icone de seta */}
            <LogoIcon />
          </div>
        </div>

        <div className="flex flex-col items-start mt-40 ">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <div  key={menu.id} className={classes}>
                <Link  href={menu.link}>
                  <a className="flex py-4 px-3 items-center w-full h-full">
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-white"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

    
      <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <LogoutIcon />
        </div>
        {!toggleCollapse && (
          <button
            onClick={handleLogout}
            className={
              classNames("text-md font-medium text-white")
            }>
            Logout
          </button>
        )}
      </div>
    </div> 
  );
};

export default Sidebar;
