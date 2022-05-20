import * as S from "./SidebarSecondary.styled";
import Image from "next/image";
import Link from "next/link";
import { scroller } from "react-scroll";
import Aside from "@/components/Aside/Aside";
import ConditionalWrapper from "@/components/ConditionalWrapper/ConditionalWrapper";
import { ReactChild } from "react";

interface SidebarSecondaryProps {
  selected: string;
  menuList: {
    title: string;
    icon: StaticImageData;
    url: string;
    key: string;
  }[];
  header?: {
    userName: string;
  };
  onLinkClick?: boolean;
}

const SidebarSecondary = ({
  selected,
  menuList,
  header,
  onLinkClick,
}: SidebarSecondaryProps) => {
  return (
    <Aside>
      {header && (
        <S.AsideHeader>
          <S.UserGreeting>Hello {header.userName}!</S.UserGreeting>
          <Link href="/user/login">
            <a>Sign out</a>
          </Link>
        </S.AsideHeader>
      )}
      <S.SideBarLinkNav selected={selected}>
        <S.LinkList>
          {menuList.map((link) => {
            return (
              <S.LinkLi
                key={link.key}
                onClick={
                  onLinkClick
                    ? () =>
                        scroller.scrollTo(link.title, {
                          smooth: true,
                          offset: -200,
                        })
                    : () => {}
                }
              >
                <ConditionalWrapper
                  condition={!onLinkClick}
                  wrapper={(children: ReactChild) => (
                    <Link href={link.url}>{children}</Link>
                  )}
                >
                  <S.AnchorLink active={link.key == selected}>
                    <S.IconWrap>
                      <Image alt="" src={link.icon} layout="fill" />
                    </S.IconWrap>
                    {link.title}
                  </S.AnchorLink>
                </ConditionalWrapper>
              </S.LinkLi>
            );
          })}
        </S.LinkList>
      </S.SideBarLinkNav>
    </Aside>
  );
};

export default SidebarSecondary;
