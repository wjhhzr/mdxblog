// @ts-nocheck
import {
  Externalink,
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

const Footer: FC = () => {
  return (
    <FooterWapper>
      <MaxWidthWapper>
        <FooterLeft>
          <FooterTop>
            <Externalink href="/">
              <LogoFirst>东方战虎</LogoFirst>.<LogoLast>辉</LogoLast>
            </Externalink>
            <span>
              <FooterThanks>感谢阅读！</FooterThanks>
            </span>
          </FooterTop>
          <FooterBottom>@2022 {meta.name} All Rights Reserved</FooterBottom>
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
    </FooterWapper>
  );
};

export default Footer;
