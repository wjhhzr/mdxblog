// @ts-nocheck

import styled from 'styled-components'

const SpacerWapper = styled.div`
    min-width: ${(props) => `${props.height+'px'}` || "48px" };
    min-height: ${(props) => `${props.height+'px'}` || "48px" };

    
`;

export default SpacerWapper;