import Blog from './pages/blog/page'

import {createBrowserRouter, createRoutesFromElements, RouterProvider ,Route} from 'react-router-dom'
import Preview from './pages/preview/page'
import NewBlog from './pages/newPost/page'
import NewCategory from './pages/newCategories/page'
import NewSystemPage from './pages/newSystemPage/page'
import NewBlogger from './pages/newBlogger/page'
import NewPage from './pages/newPage/page'
import EditCategory from './pages/editCategory/page'
import EditBlog from './pages/editBlog/page'
import EditBlogger from './pages/editBlogger/page'
import EditPage from './pages/editPage/page'
import EditSystemPage from './pages/editSystemPage/page'
import ViewBlog from './pages/viewBlog/page'
import ViewBlogger from './pages/viewBlogger/page'
import ViewCategory from './pages/viewCategory/page'
import ViewSystemPage from './pages/viewSystemPage/page'
import ViewPage from './pages/viewPage/page'


const router = createBrowserRouter(
	
	createRoutesFromElements(

		<Route path='/' >
			<Route index element={<Blog/>}></Route>
			<Route path="newPost" element={<NewBlog/>}></Route>
			<Route path="newCategories" element={<NewCategory/>}></Route>
			<Route path="newSystemPage" element={<NewSystemPage/>}></Route>
			<Route path="newBlogger" element={<NewBlogger/>}></Route>
			<Route path="newPage" element={<NewPage/>}></Route>
			<Route path="editCategories" element={<EditCategory/>}></Route>
			<Route path="editPost" element={<EditBlog/>}></Route>
			<Route path="editBlogger" element={<EditBlogger/>}></Route>
			<Route path="editPage" element={<EditPage/>}></Route>
			<Route path="editSystemPage" element={<EditSystemPage/>}></Route>
			<Route path="viewBlog" element={<ViewBlog/>}></Route>
			<Route path="viewBlogger" element={<ViewBlogger/>}></Route>
			<Route path="viewCategories" element={<ViewCategory/>}></Route>
			<Route path="viewSystemPage" element={<ViewSystemPage/>}></Route>
			<Route path="viewPage" element={<ViewPage/>}></Route>
			<Route path="/preview" element={<Preview/>}></Route>
			
		</Route>
	)
)


function App() {
  return (

		<RouterProvider router={router}/>

  )
}

export default App
