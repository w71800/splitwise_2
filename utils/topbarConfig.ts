interface Icon {
  type: 'icon'
  icon: string
  method: string
}

interface Text {
  type: 'text'
  text: string
  method: string
}

export interface Config {
  left: Icon | Text
  middle: string
  right: Icon | Text
}


const configs = {
  'friends': {
    left: {
      type: 'icon',
      icon: '/icons/left-arrow.png',
      method: 'back'
    },
    middle: '朋友',
  },
  'groups': {
    left: {
      type: 'icon',
      icon: '/icons/left-arrow.png',
      method: 'back'
    },
    middle: '群組',
  },
  'records': {
    left: {
      type: 'icon',
      icon: '/icons/left-arrow.png',
      method: 'back'
    },
    middle: '明細',
    right: {
      type: 'icon',
      icon: '/icons/edit.png',
      method: 'edit'
    }
  }
}


export default configs