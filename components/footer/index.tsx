// @ts-nocheck
import {
  LogoFirst,
  LogoLast
} from "components/header/style";
import type { FC } from "react";
import {
  FooterLeft,
  FooterRight,
  FooterThanks,
  FooterTop,
  FooterWapper,
  FooterBottom,
  FooterColumn,
  FooterHeading,
  FooterColumnChildren,
  MaxWidthWapper
} from "./style";
import meta from "config/meta.json";
import React from "react";
import RouterLink from "components/RouterLink";

function Footer () {
  return (
    <FooterWapper>
      <MaxWidthWapper data-media={true} >
        <FooterLeft>
          <FooterTop>
            <RouterLink href="/">
              <><LogoFirst>东方战虎</LogoFirst>.<LogoLast>辉</LogoLast></>
            </RouterLink>
            <span>
              <FooterThanks>感谢阅读！不定期更新有用的技术文章，摄影知识！</FooterThanks>
            </span>
          </FooterTop>
        </FooterLeft>
        <FooterRight>
          <FooterColumn>
            <FooterHeading>链接</FooterHeading>
            <FooterColumnChildren>
              <a href="https://github.com/wjhhzr" target="_blank" rel="noreferrer">
                github
              </a>
            </FooterColumnChildren>
          </FooterColumn>
        </FooterRight>
      </MaxWidthWapper>
      <MaxWidthWapper ><FooterBottom>@2022 {meta.name} All Rights Reserved</FooterBottom></MaxWidthWapper>
    </FooterWapper>
  );
};

export default Footer;
