import { config } from '@vue/test-utils'
import { vi } from 'vitest'

config.global.mocks = {
  $t: (msg: string) => msg,
}

globalThis.vi = vi