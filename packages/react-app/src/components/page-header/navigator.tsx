/*
 * @Author: Kanata You 
 * @Date: 2022-07-10 15:50:06 
 * @Last Modified by: Kanata You
 * @Last Modified time: 2022-07-10 15:51:50
 */

import React from 'react';
import styled from 'styled-components';


const NavigatorGroup = styled.nav({
  flexGrow: 1,
  flexShrink: 0,
});

const Navigator: React.FC = React.memo(function Navigator () {
  return (
    <NavigatorGroup>

    </NavigatorGroup>
  );
});


export default Navigator;
