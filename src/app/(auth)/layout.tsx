import React, { PropsWithChildren } from 'react'

const layout = ({children}: PropsWithChildren) => {
  return (
    <main>{children}</main>
  )
}

export default layout