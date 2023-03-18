// @ts-nocheck
import {
  LogoFirst,
  LogoLast
} from "src/components/header/style";
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
  FooterColumnChildren
} from "./style";
import meta from "meta.json";
import React from "react";
import RouterLink from "src/components/RouterLink";
import MaxWidthWrapper from "src/components/maxWidthWrapper";
function Footer () {
  return (
    <FooterWapper>
      <MaxWidthWrapper mobileStyle="flex-direction: column;" style={{display:"flex", justifyContent: "space-between"}} data-media={true} >
        <FooterLeft>
          <FooterTop>
            <RouterLink href="/">
              <><LogoFirst>东方战虎</LogoFirst>.<LogoLast>辉</LogoLast></>
            </RouterLink>
            <span>
              <FooterThanks>感谢阅读！不定期更新有用的技术文章，有趣的照片！</FooterThanks>
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
      </MaxWidthWrapper>
      <MaxWidthWrapper ><FooterBottom>@2022 {meta.name} All Rights Reserved</FooterBottom></MaxWidthWrapper>
    </FooterWapper>
  );
};

export default Footer;
