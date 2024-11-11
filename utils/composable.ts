import { inject } from 'vue'

function useSideNotification() {
  const isShowing = inject<Ref<boolean>>('isNotificationShowing')
  const isSuccess = inject<Ref<boolean>>('isProcessSuccess')
  
  return (status: 'success' | 'error') => {
    console.log(isShowing, isSuccess)
    isShowing!.value = true
    isSuccess!.value = (status === 'success')

    setTimeout(() => {
      isShowing!.value = false
    }, 2500)
  }
}

export { 
  useSideNotification
}


