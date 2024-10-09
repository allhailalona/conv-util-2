import { useState } from 'react'
import { cloneDeep } from 'lodash'
import { useExplorer } from '../ExplorerContext'
import { Button, Input, notification } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

export default function ActionPane(): JSX.Element {
  const [outputDir, setOutputDir] = useState<string>('C:\\Users\\user\\Desktop')

  const { explorer, setExplorer } = useExplorer()

  // Config 'no selected files' notification
  const showSelectedFilesNotification = (): void => {
    notification.info({
      message: 'No Content Loaded',
      description:
        'Please load content using one of the methods above, then pick an output directory!',
      icon: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
      placement: 'topRight',
      duration: 3
    })
  }

  const handleSelectOutputDir = async (): Promise<void> => {
    console.log('hello from output dir')
    const res = await window.electron.ipcRenderer.invoke('SELECT_OUTPUT_DIR')
    console.log('res is front', res)
    setOutputDir(res)
  }

  const handleConvertExplorer = async (): Promise<void> => {
    // Clone explorer
    if (explorer.length > 0 && outputDir.length > 0) {
      const clonedExplorer = cloneDeep(explorer) // Properly cloning the explorer
      const props = { explorer: clonedExplorer, outputDir } // Create props object with cloned explorer
      console.log('sending', props)
      const res = await window.electron.ipcRenderer.invoke('CONVERT_EXPLORER', props)
    } else {
      showSelectedFilesNotification()
    }
  }

  return (
    <div className="w-full h-[7%] pb-2 px-3 bg-gray-900 flex justify-between items-center">
      <div className="flex flex-row items-center gap-4">
        <Button
          onClick={() => {
            setExplorer([])
            setOutputDir('')
          }}
          className="bg-red-600 transition-colors duration-500 text-white text-lg font-bold px-5 py-4 rounded"
        >
          Clear All
        </Button>
        <div className="flex flex-row rounded overflow-hidden">
          <Button
            onClick={handleSelectOutputDir}
            className="bg-yellow-600 transition-colors duration-500 text-white text-lg font-bold px-5 py-4 rounded-none"
          >
            Output
          </Button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${outputDir.length > 0 ? 'w-[400px]' : 'w-0'}`}
          >
            <Input
              placeholder="Select Output"
              className="h-full rounded-none font-bold text-lg"
              value={outputDir}
            />
          </div>
        </div>
      </div>
      <Button
        onClick={handleConvertExplorer}
        className="bg-green-600 transition-colors duration-500 text-white text-lg font-bold px-5 py-4"
      >
        Convert
      </Button>
    </div>
  )
}
