import React, { FunctionComponent } from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

import Navigator from 'components/navigator/navigator'


const StyledBtn = styled(Button)`
  margin: 30px 30px;
`

const MainPage: FunctionComponent = () => {
  return (
    <div>
      <Navigator />
      Hello Typescript
      <StyledBtn type="primary" shape="round">Primary Button</StyledBtn>
    </div>
  )
}

export default MainPage