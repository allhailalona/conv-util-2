// ProgressIndicator.js

import React from 'react'
import { Progress, Spin } from 'antd'
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const FullWidthProgress = styled(Progress)`
  .ant-progress-outer {
    width: 100% !important;
  }
  .ant-progress-bg {
    height: 24px !important;
  }
`

const WhiteSpin = styled(Spin)`
  .ant-spin-dot-item {
    background-color: white;
  }
`

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const ProgressIndicator = ({ fileType, progress }) => {
  const isComplete = progress >= 100
  const iconSize = 36 // Consistent size for both spinner and checkmark

  if (fileType === 'image') {
    return (
      <CenteredContainer>
        {isComplete ? (
          <CheckOutlined style={{ fontSize: iconSize, color: '#52c41a' }} />
        ) : (
          <WhiteSpin indicator={<LoadingOutlined style={{ fontSize: iconSize }} spin />} />
        )}
      </CenteredContainer>
    )
  } else {
    // for audio and video
    return (
      <FullWidthProgress
        percent={progress}
        status={isComplete ? 'success' : 'active'}
        showInfo={false}
      />
    )
  }
}

export default ProgressIndicator
