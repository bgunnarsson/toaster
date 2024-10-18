import useToaster from '@bgunnarsson/toaster/react'
function App() {
  const { toast } = useToaster({
    position: 'bottom right',
    offset: { x: 20, y: 20 },
    customClass: 'my-toaster',
  })

  return (
    <>
      <button type="button" onClick={() => toast({ content: 'This is a text toast!' })}>
        Show Toast
      </button>
    </>
  )
}

export default App
