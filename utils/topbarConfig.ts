export interface Icon {
  type: 'icon'
  icon: string
  method: string
}

export interface Text {
  type: 'text'
  text: string
  method: string
}

// 一整個 topbar 的 config
// todo: 把 middle 改為 title、以及將 left 和 right 改為 { content: Icon | Text, method: string } 這樣的結構
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