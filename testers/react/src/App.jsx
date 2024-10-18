import useToaster from '@bgunnarsson/toaster/react'

import 'styles'

function App() {
  const { toast } = useToaster({
    position: 'bottom right',
    offset: { x: 20, y: 20 },
    customClass: 'my-toaster',
  })

  return (
    <>
      <button type="button" className="button" onClick={() => toast({ content: 'This is a text toast!' })}>
        Show Toast
      </button>
    </>
  )
}

export default App
