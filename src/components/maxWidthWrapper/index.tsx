import { mobileBreakpoint } from "src/lib/function/cssMixins";
import styled from "styled-components";

interface IMaxProps {
    max?: number
    flex?: boolean
    mobileStyle?: string
}

const MaxWidthWrapper = styled.div<IMaxProps>`
    z-index: 2;
    width: 100%;
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 32px;
    padding-bottom: 32px;
    ${({mobileStyle})=>mobileBreakpoint(mobileStyle)}
`;

export default MaxWidthWrapper;