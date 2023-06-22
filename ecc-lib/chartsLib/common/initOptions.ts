import { LocaleOption } from 'echarts/types/src/core/locale'
import { RendererType } from 'echarts/types/src/util/types'

type EChartsInitOpts = {
  locale?: string | LocaleOption,
  renderer?: RendererType,
  devicePixelRatio?: number,
  useDirtyRect?: boolean,
  useCoarsePointer?: boolean,
  pointerSize?: number,
  ssr?: boolean,
  width?: number | string,
  height?: number | string
};

const initOptions: EChartsInitOpts = {
  renderer: 'canvas',
  ssr: true
}

export {
  initOptions
}

