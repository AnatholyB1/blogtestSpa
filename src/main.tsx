import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { TabProvider } from './provider/tabProvider.tsx';
import { PostProvider } from './provider/postProvider.tsx';
import { TypeProvider } from './provider/typeProvider.tsx';
import {PageProvider} from './provider/pageProvider.tsx';
import {BloggerProvider} from './provider/BloggerProvider.tsx';
import { SystemPageProvider } from './provider/SystemPageProvider.tsx';
import { AnimationProvider } from './provider/animationProvider.tsx';
import { CategoryProvider } from './provider/categoryProvider.tsx';
import { FrappeProvider } from 'frappe-react-sdk'
import { Toaster } from "@/components/ui/toaster"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    	  <FrappeProvider
          url='https://dev.zaviago.com' 
            tokenParams={{
            type: 'token',
            useToken: true,
            token: () => `2ad3412e27b5c61:1cf86d7f8a8a367`
          }}>
      <AnimationProvider>
      <TabProvider>
      <TypeProvider>
      <SystemPageProvider>
      <BloggerProvider>
      <PostProvider>
      <PageProvider>
      <CategoryProvider>
        
      <App />
      <Toaster />
      </CategoryProvider> 
      </PageProvider>  
      </PostProvider>
      </BloggerProvider>
      </SystemPageProvider>
      </TypeProvider>
      </TabProvider>
      </AnimationProvider>
      </FrappeProvider>
  </React.StrictMode>,
)
