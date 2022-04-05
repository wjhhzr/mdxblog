import type { FC } from 'react'
import { LayoutWapper, ContentWrapper } from './style'
import Header from 'components/header'
import Footer from 'components/footer'
import { OpenGraph } from 'components/openGraph'
import meta from 'config/meta.json'
import React from "react";

interface LayoutProps {
    children: React.ReactNode
    title?:string
    description?:string
}

const Layout: FC<LayoutProps> = ({children, title, description}) => {
    return <LayoutWapper>        
        <OpenGraph title={title || meta.name} description={description || meta.description}/>  
        <Header  />
        <ContentWrapper  >
            {children && children}            
        </ContentWrapper>
        <Footer />
    </LayoutWapper>
}

export default Layout;