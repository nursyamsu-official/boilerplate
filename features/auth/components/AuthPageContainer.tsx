type AuthPageContainerProps = {
  children: React.ReactNode
}

export function AuthPageContainer({ children }: AuthPageContainerProps) {
  return (
    <div className="container mx-auto flex min-h-[calc(100dvh-8rem)] items-center justify-center px-4 py-10">
      {children}
    </div>
  )
}
