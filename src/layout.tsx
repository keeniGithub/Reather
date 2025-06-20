import type { PropsWithChildren } from 'react'
import Footer from './components/footer'
import Header from './components/header'

export default function layout({children}: PropsWithChildren) {
  return (
        <div className='bg-gradient-to-br from-background to-muted'>
            <Header />
            <main className='min-h-screen container mx-auto px-4 py-8'>
                {children}
            </main>
            <Footer />
        </div>
    )
}
