// @ts-nocheck

import type { FC } from 'react'
import SpacerWapper from './style'
import React from "react";

const Spacer:FC<{height:number}> = ({height})=>{    
    return <SpacerWapper height={height} />
}

export default Spacer;