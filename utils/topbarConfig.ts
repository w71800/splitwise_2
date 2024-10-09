export interface Config {
  left: {
    icon: string
    method: string
  } | string
  middle: string
  right: {
    icon: string,
    method: string
  } | string
}


const configs = {
  'friends': {
    left: {
      icon: '/icons/left-arrow.png',
    },
    middle: '朋友',
  },
  'groups': {
    left: {
      icon: '/icons/left-arrow.png',
    },
    middle: '群組',
  },
  'records': {
    left: {
      icon: '/icons/left-arrow.png',
    },
    middle: '明細',
    right: {
      icon: '/icons/edit.png',
    }
  }
}


export default configs